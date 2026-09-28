import type { MetadataRoute } from "next";
import { work } from "@/data/work";
import { getLibraryPages } from "@/lib/fumadocs";
import { APP_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = APP_URL();
  const essays = getLibraryPages().map((page) => ({
    url: new URL(`/${page.slugs.join("/")}`, base).toString(),
    lastModified: page.data.date,
  }));
  const pieces = work
    .filter((item) => item.href.startsWith("/"))
    .map((item) => ({
      url: new URL(item.href, base).toString(),
      lastModified: item.date,
    }));

  return [
    { url: base, lastModified: new Date() },
    { url: new URL("/work", base).toString() },
    ...pieces,
    ...essays,
  ];
}
