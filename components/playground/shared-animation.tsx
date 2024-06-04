'use client'

import Sample from '@/assets/images/the-life-of-pablo.png'
import Image from 'next/image'

import { AnimatePresence, motion } from 'framer-motion'
import { AudioLines, Music4 } from 'lucide-react'
import { useState } from 'react'

export default function SharedAnimation() {
	const [show, setShow] = useState(false)

	return (
		<motion.div
			className='flex h-full flex-col items-center justify-end gap-4 p-4'
			style={{
				width: '400px',
			}}
		>
			<AnimatePresence initial={false}>
				{show && (
					<motion.div
						transition={{
							type: 'spring',
							bounce: 0.15,
							duration: 0.75,
						}}
						initial={{ filter: 'blur(4px)', rotate: 25 }}
						animate={{ filter: 'blur(0px)', rotate: 0 }}
						exit={{ filter: 'blur(4px)', rotate: -25 }}
						layoutId='image'
						className='z-10 cursor-pointer'
						onClick={() => setShow(!show)}
					>
						<Image
							src={Sample}
							alt={"The Life of Pablo's album cover"}
							width={200}
							height={200}
							className='rounded'
							placeholder='blur'
							blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABwklEQVRIS+2VwUoDQRSGz7'
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<motion.div
				layout='position'
				initial={{ width: '100%' }}
				animate={{ width: '100%' }}
				style={{
					borderRadius: '16px',
					width: '100%',
				}}
				className='flex flex-col items-start justify-between gap-4 border bg-gray-100 p-4'
			>
				<motion.div
					layout='position'
					className='flex h-14 w-full items-center justify-between gap-3'
				>
					<AnimatePresence initial={false} mode='popLayout'>
						{!show && (
							<motion.div
								transition={{
									type: 'spring',
									bounce: 0.15,
									duration: 0.75,
								}}
								initial={{ filter: 'blur(4px)', rotate: 25 }}
								animate={{ filter: 'blur(0px)', rotate: 0 }}
								exit={{ filter: 'blur(4px)', rotate: -25 }}
								layoutId='image'
								className='z-10 cursor-pointer'
								onClick={() => setShow(!show)}
							>
								<Image
									src={Sample}
									alt={"The Life of Pablo's album cover"}
									width={64}
									height={64}
									className='cursor-pointer rounded'
									onClick={() => setShow(!show)}
								/>
							</motion.div>
						)}
					</AnimatePresence>

					<AnimatePresence initial={false} mode='popLayout'>
						<motion.div
							layout='position'
							transition={{
								type: 'spring',
								bounce: 0.1,
								duration: 0.75,
							}}
							initial={{ filter: 'blur(4px)' }}
							animate={{ filter: 'blur(0px)' }}
							exit={{ filter: 'blur(4px)' }}
							className='flex grow flex-col items-start justify-center'
						>
							<motion.div className='font-medium'>Waves</motion.div>
							<motion.div>Kanye West</motion.div>
						</motion.div>
						/
					</AnimatePresence>

					<AnimatePresence initial={false} mode='popLayout'>
						{show ? (
							<motion.div
								key='audio-lines'
								transition={{
									type: 'spring',
									bounce: 0.1,
									duration: 0.75,
								}}
								initial={{ opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
								animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
								exit={{ opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
							>
								<AudioLines className='h-8 w-8' />
							</motion.div>
						) : (
							<motion.div
								key='music-4'
								transition={{
									type: 'spring',
									bounce: 0.1,
									duration: 0.75,
								}}
								initial={{ opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
								animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
								exit={{ opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
							>
								<Music4 className='w-8' />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>

				<div className='flex w-full items-center justify-center gap-3'>
					<div className='min-w-8 text-center text-xs'>1:32</div>

					<div className='h-1 w-full rounded-full bg-gray-200'>
						<div
							className='h-full rounded-full bg-gray-800'
							style={{ width: 'calc(100% - 1.32 * 100% / 2.15)' }}
						/>
					</div>

					<div className='min-w-8 text-center text-xs'>2:15</div>
				</div>
			</motion.div>
		</motion.div>
	)
}
