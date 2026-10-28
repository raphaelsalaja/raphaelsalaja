import { Analytics } from "@vercel/analytics/next";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { Inter, Jacquard_12, Newsreader, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { VISITED_KEY } from "@/lib/visited";

import "@/styles/main.css";

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  preload: false,
});

const serif = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  preload: false,
});

const jacquard = Jacquard_12({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jacquard",
  preload: false,
});

const openrunde = localFont({
  variable: "--font-openrunde",
  preload: false,
  src: [
    { path: "./fonts/openrunde/regular.woff2", weight: "400" },
    { path: "./fonts/openrunde/medium.woff2", weight: "500" },
    { path: "./fonts/openrunde/semibold.woff2", weight: "600" },
    { path: "./fonts/openrunde/bold.woff2", weight: "700" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: "%s" },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss" },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@raphaelsalaja",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfdfc" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
};

const visitedScript = `try{sessionStorage.getItem("${VISITED_KEY}")&&(document.documentElement.dataset.visited="")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={clsx(
        inter.className,
        mono.variable,
        serif.variable,
        jacquard.variable,
        openrunde.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static script that must run before first paint
          dangerouslySetInnerHTML={{ __html: visitedScript }}
        />
      </head>
      <body>
        <main>
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
