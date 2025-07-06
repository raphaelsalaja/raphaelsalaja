import "./globals.css";

export const metadata = {
  title: "@rs/design Playground",
  description: "Component testing playground for the @rs/design system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
