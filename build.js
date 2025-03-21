import { build } from "esbuild";

await build({
  entryPoints: ["./src/index.ts", "./src/cli.ts", "./src/workflow.ts"],
  target: "es6",
  platform: "neutral",
  format: "esm",
  bundle: true,
  tsconfig: "./tsconfig.json",
  outdir: "dist",
  mainFields: ["module", "main"],
  minify: true,
});
