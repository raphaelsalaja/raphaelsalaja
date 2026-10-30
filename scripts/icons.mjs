/** Generates components/icons/glyphs.ts from the SVG sources in components/icons/svg. */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const icons = resolve(root, "components/icons");
const output = resolve(icons, "glyphs.ts");
const check = process.argv.includes("--check");
const command = "pnpm icons";

const STYLES = ["outline", "fill"];
const ROOT = /^<svg\b[^>]*\bviewBox="0 0 18 18"[^>]*>([\s\S]*)<\/svg>\s*$/;
const ELEMENT = /<(path|circle|rect)\s([^>]*?)\/>/g;
const ATTRIBUTE = /([\w-]+)="([^"]*)"/g;
const IMPORT =
  /import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*"@\/components\/icons"/g;

const camel = (name) => name.replace(/-(\w)/g, (_, c) => c.toUpperCase());
const pascal = (file) =>
  file
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
const exportName = (glyph, style) =>
  `Icon${glyph}${style === "fill" ? "Fill" : ""}`;

function parse(path) {
  const body = ROOT.exec(readFileSync(path, "utf8"))?.[1];
  if (body === undefined) throw new Error(`${path}: expected an 18×18 <svg>.`);
  const nodes = [...body.matchAll(ELEMENT)].map(([, tag, attrs]) => [
    tag,
    Object.fromEntries(
      [...attrs.matchAll(ATTRIBUTE)].map(([, k, v]) => [camel(k), v]),
    ),
  ]);
  const rest = body.replace(ELEMENT, "").trim();
  if (rest) throw new Error(`${path}: unsupported markup ${rest.slice(0, 40)}`);
  return nodes;
}

function glyphs() {
  const found = new Map();
  for (const style of STYLES) {
    const dir = resolve(icons, "svg", style);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).sort()) {
      if (!file.endsWith(".svg")) continue;
      const glyph = pascal(file.slice(0, -4));
      if (!found.has(glyph)) found.set(glyph, new Map());
      found.get(glyph).set(style, parse(resolve(dir, file)));
    }
  }
  return new Map([...found].sort(([a], [b]) => (a < b ? -1 : 1)));
}

function imported() {
  const files = execFileSync(
    "git",
    [
      "ls-files",
      "-co",
      "--exclude-standard",
      "app",
      "components",
      "content",
      "lib",
    ],
    { cwd: root, encoding: "utf8" },
  )
    .split("\n")
    .filter(
      (file) =>
        /\.(ts|tsx)$/.test(file) &&
        !file.startsWith("components/icons/") &&
        existsSync(resolve(root, file)),
    );
  const names = new Set();
  for (const file of files) {
    const text = readFileSync(resolve(root, file), "utf8");
    for (const [, specifiers] of text.matchAll(IMPORT)) {
      for (const specifier of specifiers.split(",")) {
        const name = specifier
          .trim()
          .replace(/^type\s+/, "")
          .split(/\s+as\s+/)[0];
        if (name) names.add(name);
      }
    }
  }
  return names;
}

const all = glyphs();
const exports = [];
for (const [glyph, styles] of all) {
  for (const style of STYLES.filter((style) => styles.has(style))) {
    exports.push(
      `export const ${exportName(glyph, style)} = /* @__PURE__ */ createIcon(${JSON.stringify(glyph)}, ${JSON.stringify(style)}, ${JSON.stringify(styles.get(style))});`,
    );
  }
}

const source = execFileSync(
  process.execPath,
  [
    resolve(root, "node_modules/@biomejs/biome/bin/biome"),
    "check",
    "--write",
    `--stdin-file-path=${relative(root, output)}`,
  ],
  {
    cwd: root,
    encoding: "utf8",
    input: `import { createIcon } from "./create-icon";\n\n${exports.join("\n")}\n`,
  },
);

const current = existsSync(output) ? readFileSync(output, "utf8") : null;
if (current !== source) {
  if (check)
    throw new Error(`${relative(root, output)} out of date. Run ${command}.`);
  writeFileSync(output, source);
}

const used = imported();
const unused = [...all].flatMap(([glyph, styles]) =>
  [...styles.keys()]
    .map((style) => exportName(glyph, style))
    .filter((name) => !used.has(name)),
);
console.log(
  `${check ? "Verified" : "Wrote"} glyphs.ts (${exports.length} icons, ${all.size} glyphs)`,
);
if (unused.length > 0) console.log(`Not imported: ${unused.join(", ")}`);
