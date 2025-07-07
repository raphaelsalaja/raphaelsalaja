import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.tsx",
    "src/accordion/index.tsx",
    "src/alert-dialog/index.tsx", 
    "src/avatar/index.tsx",
    "src/breadcrumb/index.tsx",
    "src/button/index.tsx",
    "src/carrot/index.tsx",
    "src/checkbox/index.tsx",
    "src/checkbox-group/index.tsx",
    "src/collapsible/index.tsx",
    "src/conditional-wrap/index.ts",
    "src/context-menu/index.tsx",
    "src/dialog/index.tsx",
    "src/field/index.tsx",
    "src/fieldset/index.tsx",
    "src/form/index.tsx",
    "src/input/index.tsx",
    "src/menu/index.tsx",
    "src/menubar/index.tsx",
    "src/meter/index.tsx",
    "src/navigation-menu/index.tsx",
    "src/number-field/index.tsx",
    "src/popover/index.tsx",
    "src/preview-card/index.tsx",
    "src/progress/index.tsx",
    "src/radio/index.tsx",
    "src/radio-group/index.tsx",
    "src/scroll-area/index.tsx",
    "src/select/index.tsx",
    "src/separator/index.tsx",
    "src/slider/index.tsx",
    "src/switch/index.tsx",
    "src/tabs/index.tsx",
    "src/toast/index.tsx",
    "src/toggle/index.tsx",
    "src/toggle-group/index.tsx",
    "src/toolbar/index.tsx",
    "src/tooltip/index.tsx",
    "src/hooks/index.tsx",
    "src/types/index.tsx"
  ],
  format: ["cjs", "esm"],
  external: ["react", "react-dom"],
  dts: true,
  clean: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";'
    };
  }
});
