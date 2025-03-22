import { build } from "esbuild";

await build({
  entryPoints: ["./src/index.ts", "./src/cli.ts"],
  outdir: "dist",
  platform: "node",
  target: "node16",
  bundle: true,
  format: "esm",
  minify: true,
  tsconfig: "./tsconfig.json",
  legalComments: "none",
  external: ["chrono-node", "expr-eval", "date-fns", "ms"],
});
