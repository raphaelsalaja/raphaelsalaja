import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "@shikijs/rehype",
        {
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: false,
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 828, 1080, 1280],
    imageSizes: [32, 64, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bronsonshop.com",
        pathname: "/cdn/shop/**",
      },
    ],
  },
};

export default withMDX(nextConfig);
