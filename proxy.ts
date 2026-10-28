import { type NextRequest, NextResponse } from "next/server";

const quality = (accept: string, type: string) => {
  for (const part of accept.split(",")) {
    const [media, ...params] = part.trim().split(";");
    if (media.trim() !== type) continue;
    const q = params.find((param) => param.trim().startsWith("q="));
    return q ? Number(q.trim().slice(2)) : 1;
  }
  return 0;
};

const prefersMarkdown = (accept: string | null) => {
  if (!accept) return false;
  const markdown = quality(accept, "text/markdown");
  return markdown > 0 && markdown >= quality(accept, "text/html");
};

const HOME_LINKS = [
  '</index.md>; rel="alternate"; type="text/markdown"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</rss>; rel="alternate"; type="application/rss+xml"',
].join(", ");

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.endsWith(".md")) {
    const page = pathname === "/index.md" ? "" : pathname.slice(0, -3);
    return NextResponse.rewrite(new URL(`/md${page}`, request.url));
  }

  const page = pathname === "/" ? "" : pathname;

  if (prefersMarkdown(request.headers.get("accept"))) {
    return NextResponse.rewrite(new URL(`/md${page}`, request.url));
  }

  const response = NextResponse.next();
  response.headers.set(
    "Link",
    page ? `<${page}.md>; rel="alternate"; type="text/markdown"` : HOME_LINKS,
  );
  return response;
}

export const config = {
  matcher: ["/", "/index.md", "/work/:slug", "/library/:slug"],
};
