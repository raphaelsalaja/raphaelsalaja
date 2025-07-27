import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    viewTransition: true,
  },
  serverExternalPackages: ["steamapi"],
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
