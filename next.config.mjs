/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig) => NextConfig)>} NextConfigPlugins
 */
import withVercelToolbar from '@vercel/toolbar/plugins/next'

/** @type {NextConfigPlugins} */
const plugins = []

/** @type {import('next').NextConfig} */
const next = {
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co'
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org'
      },
      {
        protocol: 'https',
        hostname: 'api.zora.co'
      },
      {
        protocol: 'https',
        hostname: 'images.beta.cosmos.so'
      }
    ]
  }
}

plugins.push(withVercelToolbar({}))

const config = () => plugins.reduce((config, plugin) => plugin(config), next)

export default config
