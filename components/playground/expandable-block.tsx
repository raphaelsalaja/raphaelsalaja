'use client'

import {
	BookmarkIcon,
	ChatBubbleIcon,
	DotsHorizontalIcon,
	GlobeIcon,
	ImageIcon,
	Share1Icon,
} from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import useMeasure from 'react-use-measure'

export default function ExpandableBlock() {
	const [isShowingOptions, setIsShowingOptions] = useState(false)
	let [ref, bounds] = useMeasure()

	return (
		<motion.div
			animate={{
				height: bounds.height > 0 ? bounds.height : undefined,
			}}
			transition={{
				type: 'spring',
				bounce: 0.15,
				duration: 0.75,
			}}
			className='w-60 overflow-hidden border'
		>
			<div
				ref={ref}
				className='flex w-60 flex-col items-center justify-between overflow-hidden'
			>
				<motion.div
					className='flex w-full items-center justify-between border-b p-4'
					onClick={() => setIsShowingOptions((prev) => !prev)}
					whileHover={{
						cursor: 'pointer',
					}}
				>
					<div>
						<GlobeIcon />
					</div>
					Heading
					<div>
						<DotsHorizontalIcon />
					</div>
				</motion.div>
				<AnimatePresence mode='popLayout'>
					{isShowingOptions && (
						<motion.div
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							exit={{
								opacity: 0,
							}}
							transition={{
								duration: 0.2,
							}}
							className='flex w-full flex-col'
						>
							<motion.div className='flex h-40 w-full items-center justify-center bg-zinc-200/20'>
								<ImageIcon className='w-24' />
							</motion.div>
							<motion.div className='flex w-full items-center justify-between border-t p-4'>
								<div className='flex gap-4'>
									<ChatBubbleIcon />
									<Share1Icon />
								</div>
								<BookmarkIcon />
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	)
}
