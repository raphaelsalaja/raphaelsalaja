import type { Metadata } from "next";

const {
  NEXT_PUBLIC_VERCEL_ENV: env = "development",
  NEXT_PUBLIC_VERCEL_BRANCH_URL: branchUrl,
  NEXT_PUBLIC_VERCEL_URL: baseUrl,
} = process.env;

const APP_URLS: Record<string, string> = {
  production: "https://www.raphaelsalaja.com",
  preview: `https://${branchUrl || baseUrl}`,
  development: "http://localhost:3000",
};

export const APP_URL = APP_URLS[env] ?? APP_URLS.development;

export const APP_NAME = "Raphael Salaja";

export const APP_DESCRIPTION =
  "Someone who loves mixing different influences, genres and styles to create unique, innovative work. I enjoy pushing boundaries and exploring new ways to express myself without limitations.";

export const APP_OPENGRAPH_IMAGE = `${APP_URL}/media/og.png`;

export const KEYWORDS = [
  "Raphael Salaja",
  "Design Engineer",
  "Creative Endeavors",
  "Multidisciplinary Artist",
  "Innovative Works",
  "Open Source",
  "Generative Art",
];

function createBaseMetadata(title: string, description: string): Metadata {
  return {
    metadataBase: new URL(APP_URL),
    title: title,
    description: description,
    keywords: KEYWORDS,
    openGraph: {
      description: description,
      images: [{ url: APP_OPENGRAPH_IMAGE }],
      locale: "en_US",
      siteName: title,
      title: title,
      type: "website",
      url: APP_URL,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@raphaelsalaja",
      description: description,
      images: [{ url: APP_OPENGRAPH_IMAGE }],
      title: "Raphael Salaja",
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

export function generateMetadataForPost(title: string, description: string): Metadata {
  return createBaseMetadata(title, description);
}
