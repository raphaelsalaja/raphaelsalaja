'use client'

import {
	Browser,
	Deployment,
	Dimensions,
	Geolocation,
	Source,
	Time,
} from '@/components/metadata/metadata-instruments'
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'

import { cn } from '@/lib/utils'
import useMeasure from 'react-use-measure'

const MetadataDialog: React.FC = () => {
	let [ref, bounds] = useMeasure()
	let [show, setShow] = useState(false)

	let container = {
		initial: {
			opacity: 0,
			scale: 0,
		},
		animate: {
			opacity: 1,
			scale: 1,
			borderRadius: show ? '16px' : '50%',
			padding: show ? '4px' : '0',
			paddingBottom: '0px',
		},
		exit: {
			opacity: 0,
			scale: 0,
		},
		transition: {
			type: 'spring',
			bounce: 0.1,
			duration: 0.75,
		},
	}

	let content = {
		initial: {
			opacity: 0,
			filter: 'blur(12px)',
		},
		animate: {
			opacity: 1,
			filter: 'blur(0px)',
		},
		exit: {
			opacity: 0,
			filter: 'blur(12px)',
		},
		transition: {
			type: 'spring',
			bounce: 0.1,
			duration: container.transition.duration,
		},
	}

	return (
		<motion.div
			layout
			initial={container.initial}
			animate={container.animate}
			exit={container.exit}
			transition={container.transition}
			style={{
				overflow: 'hidden',
				position: 'fixed',
				bottom: '1rem',
				originY: 0,
			}}
			className={cn('flex flex-col items-center justify-center bg-muted align-middle')}
		>
			<div
				ref={ref}
				className={cn('flex origin-bottom flex-col items-center justify-center')}
			>
				<AnimatePresence mode='popLayout' initial={false}>
					{show && (
						<motion.div
							layout
							key='content'
							variants={content}
							initial={content.initial}
							animate={content.animate}
							exit={content.exit}
							transition={content.transition}
							className='z-0 flex flex-col items-center justify-center align-middle'
						>
							<div className='flex flex-col gap-2 rounded-xl border bg-white p-4 shadow-sm'>
								<div className='flex h-6 items-center justify-between gap-2'>
									<h1 className='font-semibold'>Site Metadata</h1>
									<Button
										onClick={() => setShow(false)}
										variant='outline'
										className='h-6 w-6 rounded p-1 shadow-none hover:bg-gray-100'
									>
										<Cross1Icon />
									</Button>
								</div>

								<div className='grid grid-cols-3 gap-x-8 gap-y-4 transition-all'>
									<Deployment />
									<Geolocation />
									<Browser />
									<Dimensions />
									<Source />
									<Time />
								</div>
							</div>

							<div className='flex items-center justify-between p-3 align-middle text-xs text-muted-foreground/50'>
								<div>
									Powered by
									<Link
										href='https://vercel.com'
										target='_blank'
										rel='noopener noreferrer'
										className='mx-1 font-medium text-muted-foreground/70'
									>
										▲ Vercel
									</Link>
									&
									<Link
										href='https://nextjs.org'
										target='_blank'
										rel='noopener noreferrer'
										className='mx-1 font-medium text-muted-foreground/70'
									>
										Next.js
									</Link>
								</div>
							</div>

							{/* button holder */}
							<motion.div layout layoutId='button' className='absolute' />
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence mode='popLayout'>
					{!show && (
						<motion.button
							layout
							layoutId='button'
							key='button'
							variants={content}
							initial={content.initial}
							animate={content.animate}
							exit={content.exit}
							transition={content.transition}
							onClick={() => setShow(true)}
							className={cn('z-10', 'p-2')}
						>
							<PlusIcon />
						</motion.button>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	)
}

export { MetadataDialog }
