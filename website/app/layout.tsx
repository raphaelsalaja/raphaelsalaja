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
    <ViewTransitions>
      <html lang="en" className={clsx(inter.className)}>
        <Layout>
          <Providers>
            {breadcrumb}
            {children}
            {footer}
          </Providers>
        </Layout>
      </html>
    </ViewTransitions>
  );
}
