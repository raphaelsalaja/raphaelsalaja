import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  target: "node18",
  onSuccess: async () => {
    // Make CLI executable
    await import("node:fs").then((fs) => {
      fs.chmodSync("./dist/cli.js", 0o755);
    });
  },
});
