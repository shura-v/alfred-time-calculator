import { build } from "tsup";

await build({
  entry: ["./src/index.ts", "./src/cli.ts"],
  outDir: "dist",
  platform: "node",
  target: "node16",
  bundle: true,
  format: "esm",
  minify: true,
  dts: true,
  external: ["chalk", "chrono-node", "date-fns", "expr-eval", "ms"],
  banner: {
    js: "#!/usr/bin/env node",
  },
});
