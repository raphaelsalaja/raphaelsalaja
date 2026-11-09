import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Back } from "@/components/back";
import { Prompts } from "@/components/prompts";
import { Sounds } from "@/components/sounds";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          src="https://cdn.visitors.now/v.js"
          data-token="f44417d3-95bf-4b02-9ee5-f8b5bce8ec2d"
        />
      </head>
      <body>
        <main>
          <Back />
          {children}
        </main>
        <Sounds />
        <Prompts />
        <Analytics />
      </body>
    </html>
  );
}
