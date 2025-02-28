import { defineConfig } from "tsup";

export default defineConfig({
  entry: [ "src/*.css"],  
  external: ["react"],
  clean: true, 
  outDir: "dist",
});
