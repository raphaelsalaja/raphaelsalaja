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

// `next build` sets NODE_ENV to production before this file loads.
// `page.dev.tsx` is a page only while that extension is listed, so the
// development skills lab is not a route in the production build.
const production = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: production
    ? ["ts", "tsx", "mdx"]
    : ["ts", "tsx", "mdx", "dev.tsx"],
  webpack: (config, { dev, webpack }) => {
    if (!dev) {
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /skills-at-work/ }),
      );
    }
    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 828, 1080, 1280],
    imageSizes: [32, 64, 128, 256],
  },
};

export default withMDX(nextConfig);
