'use client'

import dynamic from 'next/dynamic'
import data from './data/spotify.json'

export default function SpotifyGraph() {
	const SpotifyForceGraph = dynamic(
		() => import('./components/graph').then((module) => module.SpotifyForceGraph),
		{
			ssr: false,
		}
	)
	return (
		<div className='h-full w-full'>
			<SpotifyForceGraph data={data} />
		</div>
	)
}
