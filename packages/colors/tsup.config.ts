import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/**/index.css"], // Capture nested CSS files
  external: ["react"],
  clean: true,
  outDir: "dist",
  format: ["esm"],
});
