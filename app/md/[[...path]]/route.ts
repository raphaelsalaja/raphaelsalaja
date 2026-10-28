import { markdownPaths, pageMarkdown } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return markdownPaths.map((pathname) => ({
    path: pathname === "/" ? [] : pathname.slice(1).split("/"),
  }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/md/[[...path]]">,
) {
  const { path = [] } = await params;
  const pathname = `/${path.join("/")}`;
  const markdown = await pageMarkdown(pathname);

  if (!markdown) return new Response("Not found", { status: 404 });

  return new Response(`${markdown}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Markdown-Tokens": String(Math.ceil(markdown.length / 4)),
      Link: `<${SITE_URL}${pathname === "/" ? "" : pathname}>; rel="canonical"`,
      Vary: "Accept",
    },
  });
}
