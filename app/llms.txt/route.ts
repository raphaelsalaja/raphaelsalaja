import { posts } from "@/data/library";
import { workPages } from "@/data/work";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const text = `# ${SITE_NAME}

> Design engineer based in Ireland, currently at Warp. Writing about interfaces, animation and craft, plus open source tools for the web.

Every page is available as Markdown by appending .md to its URL or by requesting it with Accept: text/markdown.

## Pages

- [Home](${SITE_URL}/index.md): About, projects, experiments and writing

## Writing

${posts.map((post) => `- [${post.title}](${SITE_URL}/library/${post.slug}.md): ${post.description}`).join("\n")}

## Experiments

${workPages.map((item) => `- [${item.title}](${SITE_URL}${item.href}.md): ${item.description ?? item.title}`).join("\n")}
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
