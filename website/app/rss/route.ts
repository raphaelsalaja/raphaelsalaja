import { getLibraryPages } from "@/lib/fumadocs";
import { APP_DESCRIPTION, APP_NAME, APP_URL } from "@/lib/site";

export function GET() {
  const base = APP_URL();
  const items = getLibraryPages()
    .map((page) => {
      const url = new URL(`/${page.slugs.join("/")}`, base).toString();
      return `<item>
        <title>${escapeXml(page.data.title)}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${new Date(page.data.date).toUTCString()}</pubDate>
        <description>${escapeXml(page.data.description ?? "")}</description>
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(APP_NAME)}</title>
    <link>${base}</link>
    <description>${escapeXml(APP_DESCRIPTION)}</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
