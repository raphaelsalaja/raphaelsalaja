import type { Metadata } from "next";

export const SITE_NAME = "Raphael Salaja";
export const SITE_DESCRIPTION = "Design Engineer";

function siteUrl() {
  if (process.env.VERCEL_ENV === "production") {
    return "https://www.raphaelsalaja.com";
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const SITE_URL = siteUrl();

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));

export function createMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
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
      type: "article",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      creator: "@raphaelsalaja",
      title,
      description,
    },
  };
}
