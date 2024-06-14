'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cross1Icon } from '@radix-ui/react-icons'
import * as d3 from 'd3'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ForceGraph3D } from 'react-force-graph'
import RelativeTimeFormat from 'relative-time-format'
import en from 'relative-time-format/locale/en'
import { Mesh, Sprite, SpriteMaterial, TextureLoader } from 'three'
import SpriteText from 'three-spritetext'

RelativeTimeFormat.addLocale(en)

export const SpotifyForceGraph = ({ data }) => {
	const distance = 1000
	const reference = useRef()
	const [isSelected, setIsSelected] = useState(false)
	const [selectedNode, setSelectedNode] = useState(null)

	useEffect(() => {
		if (reference.current && reference.current.d3Force) {
			const collide = d3.forceCollide().radius(10)
			reference.current.d3Force('charge').strength(-100).distanceMax(300)
			reference.current.d3Force('collide', collide)
			reference.current.d3Force('link').distance(100)
		}
	}, [reference, distance])

	const handleClick = useCallback(
		(node) => {
			// Only show the popup if the node is an artist (has an image property)
			if (node.image) {
				const distance = 200
				const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

				if (reference.current) {
					reference.current.cameraPosition(
						{
							x: node.x * distRatio,
							y: node.y * distRatio,
							z: node.z * distRatio,
						},
						node,
						2000
					)
				}
				setSelectedNode(node)
				setIsSelected(true)
			} else {
				setIsSelected(false)
			}
		},
		[reference]
	)

	const renderNodeText = (node) => {
		const spriteText = new SpriteText()
		spriteText.text = node.name ?? ''
		spriteText.textHeight = 1
		spriteText.padding = 5
		spriteText.borderWidth = 0.5
		spriteText.borderColor = 'rgba(0,0,0,0.2)'
		spriteText.color = 'black'
		spriteText.backgroundColor = 'white'
		return spriteText
	}

	const renderNodeImage = (node) => {
		const mesh = new Mesh()
		const sprite = new Sprite()
		const texture = new TextureLoader().load(node.image, (tex) => {
			tex.needsUpdate = true
			sprite.scale.set(tex.image.width / 20, tex.image.height / 20, 1)
		})
		sprite.material = new SpriteMaterial({
			map: texture,
			transparent: true,
		})
		mesh.add(sprite)
		return mesh
	}

	const memoizedForceGraph = useMemo(
		() => (
			<ForceGraph3D
				ref={reference}
				graphData={data}
				showNavInfo={false}
				linkColor={() => 'rgba(0,0,0,1)'}
				backgroundColor={'rgba(0,0,0,0)'}
				onNodeClick={handleClick}
				nodeThreeObject={(node) => {
					if (node.image) {
						return renderNodeImage(node)
					} else {
						return renderNodeText(node)
					}
				}}
				width={window.innerWidth}
				height={window.innerHeight}
			/>
		),
		[data, handleClick]
	)

	return (
		<div className='relative h-full w-full'>
			<AnimatePresence initial={false}>
				{isSelected && (
					<motion.div className='absolute bottom-0 left-0 z-10 w-96 p-4'>
						<Card
							initial={{
								filter: 'blur(4px)',
								y: 100,
								height: 'auto',
								opacity: 0,
							}}
							animate={{
								filter: 'blur(0)',
								y: 0,
								height: 'auto',
								opacity: 1,
							}}
							exit={{
								filter: 'blur(4px)',
								y: 100,
								height: 'auto',
								opacity: 0,
							}}
							transition={{
								type: 'spring',
								duration: 0.75,
							}}
							className='overflow-hidden rounded-none'
						>
							<CardHeader className='flex flex-row items-start bg-muted/50'>
								<CardTitle className='group flex w-full items-center justify-between gap-2 text-lg'>
									<span className='max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap'>
										{selectedNode.name}
									</span>
									<Button
										variant='outline'
										size='icon'
										className='rounded-none'
										onClick={() => {
											setIsSelected(false)
										}}
									>
										<Cross1Icon />
									</Button>
								</CardTitle>
							</CardHeader>
							<CardContent className='p-0 text-sm'>
								<AnimatePresence>
									<motion.div
										initial={{
											opacity: 0,
											height: 0,
											scale: 0.8,
											marginLeft: 0,
											marginRight: 0,
											marginTop: 0,
											marginBottom: 0,
											filter: 'blur(4px)',
										}}
										animate={{
											scale: 1,
											filter: 'blur(0)',
											height: 'auto',
											opacity: 1,
											marginLeft: 24,
											marginRight: 24,
											marginTop: 24,
											marginBottom: 0,
										}}
										exit={{
											marginLeft: 0,
											marginRight: 0,
											marginTop: 0,
											marginBottom: 0,
											opacity: 0,
											filter: 'blur(4px)',
											height: 0,
										}}
										className='flex flex-row flex-wrap gap-2'
									>
										{selectedNode.genres.map((genre) => (
											<div
												key={genre}
												className='inline-block border p-2 capitalize'
											>
												{genre}
											</div>
										))}
									</motion.div>
								</AnimatePresence>

								<div className='p-6 pt-4'>
									<Button
										variant='outline'
										className='w-full rounded-none'
										onClick={() => {
											if (selectedNode.genres) {
												window.open(
													`https://open.spotify.com/artist/${selectedNode.id}`,
													'_blank'
												)
											}
										}}
									>
										View on Spotify
									</Button>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>

			<div className='flex h-full w-full items-center justify-center'>
				{memoizedForceGraph}
			</div>
		</div>
	)
}
