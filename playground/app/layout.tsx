import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";

import "@/styles/main.css";

export const metadata = {
  title: "@rs/design",
  description: "Component testing playground for the @rs/design system",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={inter.className}>
        <body>
          <main data-animate>{children}</main>
        </body>
      </html>
    </ViewTransitions>
  );
}
