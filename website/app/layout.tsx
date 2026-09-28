import clsx from "clsx";
import type { Metadata } from "next";
import { Jacquard_12, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";
import { Providers } from "@/components/providers";
import { opengraph } from "@/lib/site";

import "@/styles/main.css";

export const metadata: Metadata = opengraph;

const inter = localFont({
  src: [
    {
      path: "./fonts/inter/InterVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/inter/InterVariable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  adjustFontFallback: false,
});

const jacquard = Jacquard_12({
  subsets: ["latin"],
  variable: "--font-jacquard",
  weight: ["400"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={clsx(
          inter.className,
          openrunde.variable,
          mono.variable,
          jacquard.variable,
        )}
      >
        <body>
          <main data-animate>
            <Providers>{children}</Providers>
          </main>
        </body>
      </html>
    </ViewTransitions>
  );
}
