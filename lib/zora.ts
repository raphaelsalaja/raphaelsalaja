import { ZDK, ZDKChain, ZDKNetwork } from '@zoralabs/zdk'

const COLLECTION_ADDRESS = '0xc26bdb7abdf28b543c75ed6bb49f764a12f3e183'
const CREATED_COLLECTIONS = ['0xcab241ea094f1b9c8de4cd57436bb2a695a07da5']

const args = {
	endPoint: 'https://api.zora.co/graphql',
	networks: [
		{
			network: ZDKNetwork.Zora,
			chain: ZDKChain.ZoraMainnet,
		},
	],
}

const zdk = new ZDK(args)

export async function getCollections() {
	const args = {
		where: {
			collectionAddresses: ['0xcab241ea094f1b9c8de4cd57436bb2a695a07da5'],
		},
		includeFullDetails: true,
	}

	try {
		const result = await zdk.tokens(args)
		const tokens = result.tokens.nodes.map((parent) => {
			console.log(parent.token.mintInfo?.price)
			return {
				id: parent.token.tokenId,
				name: parent.token.name,
				image: parent.token.image?.url?.replace('ipfs://', 'https://ipfs.io/ipfs/'),
				price: parent.token.mintInfo?.price?.nativePrice || null,
			}
		})

		return tokens
	} catch (error) {
		console.error('Error fetching tokens:', error)
		return []
	}
}
