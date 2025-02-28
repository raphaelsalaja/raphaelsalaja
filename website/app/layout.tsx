import { og } from "@/config/site";

import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "@/styles/main.css";

export const metadata: Metadata = {
  title: og.title,
  description: og.description,
  keywords: og.keywords,
  authors: og.authors,
  creator: og.creator,
  openGraph: og.openGraph,
  twitter: og.twitter,
  metadataBase: new URL(og.url),
  manifest: `${og.url}/site.webmanifest`,
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
