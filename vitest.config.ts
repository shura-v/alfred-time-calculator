import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "vitest.config.ts",
        "build/**",
        "dist/**",
        "dist-workflow/**",
        "src/index.ts",
        "src/cli.ts",
        "src/types.ts",
        "src/workflow.ts",
        "src/calculate/types.ts",
      ],
    },
  },
});
