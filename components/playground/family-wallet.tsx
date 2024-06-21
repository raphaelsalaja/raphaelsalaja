'use client'

import { getNowPlaying, getSpotifyNodesAndLinks, getTopArtists, getTopTracks } from '@/lib/spotify'
import { cn } from '@/lib/utils'
import { CopyIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

async function fetchSpotifyData() {
	console.clear()

	const nowPlaying = await getNowPlaying()
	console.log('Now Playing:', nowPlaying)

	const topTracks = await getTopTracks()
	console.log('Top Tracks:', topTracks)

	const topArtists = await getTopArtists()
	console.log('Top Artists:', topArtists)

	const x = getSpotifyNodesAndLinks(topArtists.data?.items)
	console.log('Nodes and Links:', x)
}

const FamilyWallet = () => {
	const [isSelected, setIsSelected] = useState(false)
	const iconControls = useAnimation()
	const textControls = useAnimation()

	fetchSpotifyData()

	const commonClasses = cn(
		'relative shadow-lg cursor-pointer select-none bg-blue-9 text-white will-change-auto'
	)
	const smallCardClasses = cn(commonClasses, 'h-32 w-48')
	const largeCardClasses = cn(commonClasses, 'h-64 w-96')

	const transitions = {
		container: {
			type: 'spring',
			bounce: 0.2,
			duration: 0.4,
		},
		elements: {
			duration: 0.2,
		},
	}

	const handleClick = (event: { stopPropagation: () => void }) => {
		event.stopPropagation()
		setIsSelected(!isSelected)
	}

	useEffect(() => {
		const startBlur = async (controls: any) => {
			await controls.start({
				filter: 'blur(2px)',
				transition: { duration: 0.2 },
				opacity: 1,
			})
			controls.start({
				filter: 'blur(0px)',
				transition: { duration: 0.2 },
				opacity: 1,
			})
		}

		if (isSelected) {
			startBlur(iconControls)
			startBlur(textControls)
		} else {
			startBlur(iconControls)
			startBlur(textControls)
		}
	}, [isSelected, iconControls, textControls])

	return (
		<motion.div
			layout
			initial='initial'
			animate='animate'
			exit='exit'
			style={{
				borderRadius: '24px',
				boxShadow:
					'0px 0px 0px 2px rgba(255,255,255,0.2) inset, 0px 0px 0px 0.5px rgba(0,0,0,0.7)',
				willChange: 'transform, opacity',
			}}
			transition={transitions.container}
			className={isSelected ? largeCardClasses : smallCardClasses}
			onClick={handleClick}
		>
			<motion.div
				layout
				layoutId='tl'
				initial={{
					top: 12,
					left: 12,
				}}
				animate={{
					top: isSelected ? 16 : 12,
					left: isSelected ? 16 : 12,
					...iconControls,
				}}
				exit={{
					top: 12,
					left: 12,
				}}
				transition={transitions.elements}
				className='absolute text-2xl'
				onClick={(e) => e.stopPropagation()}
				style={{ willChange: 'top, left' }}
			>
				🛍️
			</motion.div>

			<motion.div
				layout
				layoutId='bl'
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
					...textControls,
				}}
				exit={{
					opacity: 0,
				}}
				style={{
					left: isSelected ? 16 : 12,
					bottom: isSelected ? 16 : 12,
					willChange: 'opacity, left, bottom',
				}}
				transition={transitions.elements}
				className='absolute flex flex-col gap-0'
				onClick={(e) => e.stopPropagation()}
			>
				<span className='font-medium'>Shopping</span>
				<span className='text-xs font-normal opacity-50'>1.03 ETH</span>
			</motion.div>

			<AnimatePresence initial={false}>
				{isSelected ? (
					<motion.div
						layout
						key='copy'
						layoutId='tr'
						transition={transitions.elements}
						initial={{
							opacity: 0,
							filter: 'blur(8px)',
						}}
						animate={{
							opacity: 1,
							filter: 'blur(0px)',
						}}
						exit={{
							opacity: 0,
							filter: 'blur(8px)',
						}}
						style={{
							position: 'absolute',
							top: isSelected ? 16 : 12,
							right: isSelected ? 16 : 12,
							willChange: 'opacity, filter, top, right',
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<motion.span className='flex items-center gap-2 align-middle font-medium'>
							Copy Address
							<CopyIcon />
						</motion.span>
					</motion.div>
				) : (
					<motion.div
						layout
						key='dots'
						layoutId='tr'
						transition={transitions.elements}
						initial={{
							opacity: 0,
							filter: 'blur(8px)',
						}}
						animate={{
							opacity: 1,
							filter: 'blur(0px)',
						}}
						exit={{
							opacity: 0,
							filter: 'blur(8px)',
						}}
						style={{
							position: 'absolute',
							top: isSelected ? 16 : 12,
							right: isSelected ? 16 : 12,
							willChange: 'opacity, filter, top, right',
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<DotsHorizontalIcon className='h-6 w-6 rounded-full bg-white/20 p-1' />
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{isSelected ? (
					<motion.div
						layout
						key='customize'
						layoutId='lr'
						transition={transitions.elements}
						initial={{
							opacity: 0,
							filter: 'blur(8px)',
						}}
						animate={{
							opacity: 1,
							filter: 'blur(0px)',
						}}
						exit={{
							opacity: 0,
							filter: 'blur(8px)',
						}}
						style={{
							position: 'absolute',
							bottom: isSelected ? 16 : 12,
							right: isSelected ? 16 : 12,
							willChange: 'opacity, filter, bottom, right',
						}}
						className='absolute flex flex-col gap-0 rounded-full bg-white/20 px-2'
					>
						<motion.span className='font-medium'>Customize</motion.span>
					</motion.div>
				) : (
					<motion.div
						layout
						key='empty'
						layoutId='lr'
						transition={transitions.elements}
						initial={{
							opacity: 0,
							filter: 'blur(8px)',
						}}
						animate={{
							opacity: 0,
							filter: 'blur(0px)',
						}}
						exit={{
							opacity: 0,
							filter: 'blur(8px)',
						}}
						style={{
							position: 'absolute',
							bottom: isSelected ? 16 : 12,
							right: isSelected ? 16 : 12,
							willChange: 'opacity, filter, bottom, right',
						}}
						className='absolute flex flex-col gap-0 rounded-full bg-white/20 px-2'
					>
						<motion.span className='font-medium'>Customize</motion.span>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default FamilyWallet
