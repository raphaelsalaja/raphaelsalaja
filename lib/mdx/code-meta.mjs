/**
 * Carries a fence's language and `title="…"` onto the highlighted <pre>.
 * Shiki replaces each <pre> outright, so `wrap` runs before it and `unwrap`
 * after it. They're separate functions because unified merges repeats of one.
 */

const CARRIER = "dataCodeMeta";
const TITLE = /\btitle="([^"]+)"/;

function walk(node, visit) {
  if (!node.children) return;
  node.children.forEach((child, index) => {
    visit(child, index, node);
    walk(child, visit);
  });
}

export function wrap() {
  return (tree) =>
    walk(tree, (node, index, parent) => {
      if (node.tagName !== "pre") return;
      const code = node.children?.[0];
      if (code?.tagName !== "code") return;
      const language = code.properties?.className
        ?.find((name) => String(name).startsWith("language-"))
        ?.slice(9);
      const title = TITLE.exec(code.data?.meta ?? "")?.[1];
      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { [CARRIER]: "", dataTitle: title, dataLanguage: language },
        children: [node],
      };
    });
}

export function unwrap() {
  return (tree) =>
    walk(tree, (node, index, parent) => {
      if (!node.properties || !(CARRIER in node.properties)) return;
      let pre = node.children[0];
      if (pre.type === "root") pre = pre.children[0];
      const { dataTitle, dataLanguage } = node.properties;
      pre.properties = { ...pre.properties, dataTitle, dataLanguage };
      parent.children[index] = pre;
    });
}
