import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/calculate/**"],
      exclude: ["src/calculate/types.ts"],
    },
  },
});
