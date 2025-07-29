import type { Metadata } from "next";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";
import { opengraph } from "@/config/site";
import "@/styles/main.css";
import clsx from "clsx";
import { Layout } from "@/components/layouts/root";
import { Providers } from "@/components/providers";

export const metadata: Metadata = opengraph;

const inter = localFont({
  src: "./fonts/inter/variable.ttf",
});

const openrunde = localFont({
  variable: "--font-openrunde",
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
});

export default async function RootLayout({
  breadcrumb,
  children,
}: Readonly<{
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={clsx(inter.className, openrunde.variable)}>
        <Layout>
          <Providers>
            {breadcrumb}
            {children}
          </Providers>
        </Layout>
      </html>
    </ViewTransitions>
  );
}
