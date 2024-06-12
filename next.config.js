/**
 * @type {import('next').NextConfig}
 */
const config = {
	pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		mdxRs: true,
	},
	transpilePackages: ['three'],
	images: {
		domains: [
			'i.scdn.co',
			'avatar.vercel.sh',
			'cloudflare-ipfs.com',
			'avatars.githubusercontent.com',
			'picsum.photos',
			'pbs.twimg.com',
			"ipfs.io",
			'api.zora.co',
			'images.beta.cosmos.so',
		],

	},
}

const withVercelToolbar = require('@vercel/toolbar/plugins/next')();
const withMDX = require('@next/mdx')()

module.exports = withVercelToolbar(withMDX(config))

