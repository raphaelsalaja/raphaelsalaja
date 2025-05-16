import nextMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    viewTransition: true,
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
