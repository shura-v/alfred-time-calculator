import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { createWriteStream, mkdirSync } from "fs";
import archiver from "archiver";
import { build } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DIST_DIR = path.resolve(__dirname, "../dist-workflow");
const TEMPLATE_DIR = path.resolve(__dirname, "../workflow-template");
const OUTPUT_DIR = path.join(DIST_DIR, "package");
const RELEASE_DIR = path.resolve(__dirname, "../dist-release");
const FINAL_ARCHIVE = path.join(RELEASE_DIR, "time-calculator.alfredworkflow");

async function main() {
  console.log("🏗  1. Bundling workflow.js with esbuild...");
  await build({
    entryPoints: ["./src/workflow.ts"],
    target: "es6",
    platform: "neutral",
    format: "esm",
    bundle: true,
    tsconfig: "./tsconfig.json",
    outdir: DIST_DIR,
    mainFields: ["module", "main"],
    minify: true,
    legalComments: "none",
  });

  console.log("📦  2. Preparing files...");
  const jsCode = await fs.readFile(path.join(DIST_DIR, "workflow.js"), "utf8");
  const readme = await fs.readFile(
    path.join(TEMPLATE_DIR, "README.md"),
    "utf8",
  );

  const plistTemplate = await fs.readFile(
    path.join(TEMPLATE_DIR, "info.plist"),
    "utf8",
  );
  const { version } = JSON.parse(
    await fs.readFile(path.resolve(__dirname, "../package.json"), "utf8"),
  );

  const finalPlist = plistTemplate
    .replace("<workflow:js />", jsCode)
    .replace("<workflow:readme />", readme)
    .replace("<workflow:version />", version);

  mkdirSync(OUTPUT_DIR, { recursive: true });
  mkdirSync(RELEASE_DIR, { recursive: true });

  await Promise.all([
    fs.writeFile(path.join(OUTPUT_DIR, "info.plist"), finalPlist),
    copy("icon.png"),
  ]);

  console.log("🧳  3. Zipping .alfredworkflow...");
  await zipDirectory(OUTPUT_DIR, FINAL_ARCHIVE);

  console.log(`✅  Done! Ready: ${FINAL_ARCHIVE}`);
}

async function copy(fileName) {
  const src = path.join(TEMPLATE_DIR, fileName);
  const dest = path.join(OUTPUT_DIR, fileName);
  await fs.copyFile(src, dest);
}

async function zipDirectory(sourceDir, outPath) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive.directory(sourceDir, false).on("error", reject).pipe(stream);
    stream.on("close", () => resolve());
    archive.finalize();
  });
}

main().catch((err) => {
  console.error("❌  Build failed:", err);
  process.exit(1);
});
