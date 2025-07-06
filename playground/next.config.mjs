/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  transpilePackages: ["@rs/design", "@rs/styles"],
};

export default nextConfig;
