import type { Metadata } from "next";
import { posts } from "@/data/library";
import { work } from "@/data/work";

export const SITE_NAME = "Raphael Salaja";
export const SITE_DESCRIPTION = "Design Engineer";

export const SOCIALS = {
  x: "https://x.com/raphaelsalaja",
  github: "https://github.com/raphaelsalaja",
} as const;

function siteUrl() {
  if (process.env.VERCEL_ENV === "production") {
    return "https://www.raphaelsalaja.com";
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const SITE_URL = siteUrl();

const format = (options: Intl.DateTimeFormatOptions) => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    ...options,
    timeZone: "UTC",
  });
  return (date: string) => formatter.format(new Date(date));
};

export const formatLongDate = format({
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const yearOf = (date: string) => date.slice(0, 4);

export const LAST_UPDATED = [...posts, ...work]
  .map((item) => item.date)
  .toSorted()
  .at(-1) as string;

export function createMetadata({
  title,
  description,
  path,
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_GB",
      ...(publishedTime
        ? { type: "article", publishedTime, authors: [SITE_NAME] }
        : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      creator: "@raphaelsalaja",
      title,
      description,
    },
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: SITE_DESCRIPTION,
  url: SITE_URL,
  sameAs: Object.values(SOCIALS),
};

export const articleJsonLd = ({
  title,
  description,
  date,
  path,
}: {
  title: string;
  description: string;
  date: string;
  path: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: date,
  url: `${SITE_URL}${path}`,
  author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
});
