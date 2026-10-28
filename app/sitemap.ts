import type { MetadataRoute } from "next";
import { posts } from "@/data/library";
import { workPages } from "@/data/work";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: posts[0].date },
    { url: `${SITE_URL}/work` },
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
