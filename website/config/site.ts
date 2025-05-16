import { Metadata } from "next";

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

const APP_URL = APP_URLS[env] ?? APP_URLS.development;
const APP_NAME = "Raphael Salaja";
const APP_DESCRIPTION =
  "Someone who loves mixing different influences, genres and styles to create unique, innovative work. I enjoy pushing boundaries and exploring new ways to express myself without limitations.";
const APP_OPENGRAPH_IMAGE = `${APP_URL}/opengraph-image.png`;

export const opengraph: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_NAME,
    template: "%s",
  },
  description: APP_DESCRIPTION,
  keywords: [
    "Raphael Salaja",
    "Design Engineer",
    "Creative Endeavors",
    "Multidisciplinary Artist",
    "Innovative Works",
    "Open Source",
    "Generative Art",
    "GitHub",
    "Patreon",
    "Instagram",
    "YouTube",
    "Twitter",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    title: APP_NAME,
    siteName: APP_NAME,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael Salaja",
    description: APP_DESCRIPTION,
    images: [{ url: APP_OPENGRAPH_IMAGE }],
    creator: "@raphaelsalaja",
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
  manifest: `${APP_URL}/site.webmanifest`,
};
