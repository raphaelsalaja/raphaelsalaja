export const componentSlugs = [
  "accordion",
  "alert-dialog",
  "avatar",
  "button",
  "checkbox",
  "checkbox-group",
  "collapsible",
  "context-menu",
  "dialog",
  "field",
  "fieldset",
  "form",
  "input",
  "menu",
  "menubar",
  "meter",
  "navigation-menu",
  "number-field",
  "popover",
  "preview-card",
  "progress",
  "radio",
  "scroll-area",
  "select",
  "separator",
  "slider",
  "switch",
  "tabs",
  "toast",
  "toggle",
  "toggle-group",
  "toolbar",
  "tooltip",
];

const capitalize = (s: string) =>
  s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const routes = componentSlugs.map((slug) => ({
  title: capitalize(slug),
  href: `/${slug}`,
}));
