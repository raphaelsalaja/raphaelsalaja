import type { MetadataRoute } from "next";
import { posts } from "@/data/library";
import { workPages } from "@/data/work";
import { LAST_UPDATED, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: LAST_UPDATED },
    ...workPages.map((item) => ({
      url: `${SITE_URL}${item.href}`,
      lastModified: item.date,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/library/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
