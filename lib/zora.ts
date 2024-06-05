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
	}

	const response = await zdk.tokens(args)
}
