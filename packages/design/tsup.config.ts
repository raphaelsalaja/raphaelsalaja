import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.tsx"],
  format: ["cjs", "esm"],
  external: ["react"],
  dts: true,
});
