import clsx from "clsx";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";
import { Providers } from "@/components/providers";
import { opengraph } from "@/lib/site";

import "@/styles/main.css";

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

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
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
      <html
        lang="en"
        className={clsx(inter.className, openrunde.variable, mono.variable)}
      >
        <body>
          <main data-animate>
            <Providers>
              {breadcrumb}
              {children}
            </Providers>
          </main>
        </body>
      </html>
    </ViewTransitions>
  );
}
