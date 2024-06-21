/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig) => NextConfig)>} NextConfigPlugins
 */
import withVercelToolbar from '@vercel/toolbar/plugins/next'

/** @type {NextConfigPlugins} */
const plugins = []

/** @type {import('next').NextConfig} */
const config = {
	pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
	reactStrictMode: true,
	swcMinify: true,
	transpilePackages: ['three'],
	images: {
		domains: [
			'i.scdn.co',
			'avatar.vercel.sh',
			'cloudflare-ipfs.com',
			'avatars.githubusercontent.com',
			'picsum.photos',
			'pbs.twimg.com',
			'ipfs.io',
			'upload.wikimedia.org',
			'api.zora.co',
			'images.beta.cosmos.so',
		],
	},
}

plugins.push(withVercelToolbar({}))

export default () => plugins.reduce((_, plugin) => plugin(_), config)
