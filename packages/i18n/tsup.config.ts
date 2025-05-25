import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx", "src/**/*.tsx"],
  format: ["cjs", "esm"],
  external: ["react"],
  dts: true,
});
