import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { og } from "@/config/site";
import "@/styles/main.css";
import clsx from "clsx";
import { Layout } from "@/components/layouts/root";
import { Providers } from "@/components/providers";

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

const runde = localFont({
  src: [
    {
      path: "./fonts/openrunde/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/openrunde/medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/openrunde/semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/openrunde/bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default async function RootLayout({
  breadcrumb,
  children,
  footer,
}: Readonly<{
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(runde.className, inter.variable)}>
      <Layout>
        <Providers>
          {breadcrumb}
          {children}
          {footer}
        </Providers>
      </Layout>
    </html>
  );
}
