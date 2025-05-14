import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/index.css"],
  external: ["react"],
  clean: true,
  outDir: "dist",
  format: ["esm"],
});
