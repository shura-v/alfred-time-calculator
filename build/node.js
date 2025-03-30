import { build } from "tsup";

await build({
  entryPoints: ["./src/index.ts", "./src/cli.ts"],
  outDir: "dist",
  platform: "node",
  target: "node16",
  bundle: true,
  format: "esm",
  minify: true,
  dts: true,
  legalComments: "none",
  external: ["chalk", "chrono-node", "date-fns", "expr-eval", "ms"],
});
