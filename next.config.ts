import { join } from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const plugin = (file: string) => join(process.cwd(), "lib/mdx", file);

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      plugin("code-meta-wrap.mjs"),
      [
        "@shikijs/rehype",
        {
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: false,
        },
      ],
      plugin("code-meta-unwrap.mjs"),
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
  },
};

export default withMDX(nextConfig);
