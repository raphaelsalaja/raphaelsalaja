import type { Metadata } from "next";
import { env } from "@/env";

export const VERCEL_ENV = process.env.VERCEL_ENV;

export const APP_URL = () => {
  switch (VERCEL_ENV) {
    case "development":
      return env.NEXT_PUBLIC_APP_DEVELOPMENT_URL;
    case "preview":
      return env.NEXT_PUBLIC_APP_PREVIEW_URL;
    case "production":
      return env.NEXT_PUBLIC_APP_PRODUCTION_URL;
    default:
      return env.NEXT_PUBLIC_APP_DEVELOPMENT_URL;
  }
};

export const APP_OG_ENDPOINT = `${APP_URL()}/api/og`;
export const APP_DESCRIPTION = "Design Engineer";
export const APP_NAME = "Raphael Salaja";
export const KEYWORDS = ["Raphael Salaja", "Design Engineer"];

function createBaseMetadata(title: string, description: string): Metadata {
  const og = `${APP_OG_ENDPOINT}?title=${encodeURIComponent(title)}`;

  return {
    metadataBase: new URL(APP_URL()),
    title,
    description,
    keywords: KEYWORDS,
    openGraph: {
      title,
      description,
      url: APP_URL(),
      siteName: title,
      type: "website",
      locale: "en_US",
      images: [{ url: og }],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@raphaelsalaja",
      title,
      description,
      images: [{ url: og }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const opengraph: Metadata = {
  ...createBaseMetadata(APP_NAME, APP_DESCRIPTION),
  title: {
    default: APP_NAME,
    template: "%s",
  },
};

export function generateMetadataForPost(
  title: string,
  description: string,
): Metadata {
  return createBaseMetadata(title, description);
}
