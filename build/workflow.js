import { build } from "esbuild";

await build({
  entryPoints: ["./src/workflow.ts"],
  target: "es6",
  platform: "neutral",
  format: "esm",
  bundle: true,
  tsconfig: "./tsconfig.json",
  outdir: "dist-workflow",
  mainFields: ["module", "main"],
  minify: true,
  legalComments: "none",
});
