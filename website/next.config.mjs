import nextMDX from "@next/mdx";

/** @type {NextConfigPlugins} */
const plugins = [];

/** @type {import('next').NextConfig} */
const next = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
      resolveExtensions: [
        "md",
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
      transpilePackages: ["three"],
    },
  },
};

const config = () => plugins.reduce((config, plugin) => plugin(config), next);

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

export default withMDX(config());
