'use client'

import { Separator } from '@/components/ui/separator'
import { EnvelopeClosedIcon, GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { useState } from 'react'

const container = {
	show: {
		y: 0,
		opacity: 1,
		scale: 1,
		filter: 'blur(0px)',
		transformOrigin: 'center',
		transition: {
			delay: 1,
			duration: 0.5,
			ease: [0.6, -0.05, 0.01, 0.99],
		},
	},
	hidden: {
		y: 250,
		opacity: 0,
		scale: 0.3,
		filter: 'blur(64px)',
		transformOrigin: 'center',
		transition: {
			duration: 0.5,
			ease: [0.6, -0.05, 0.01, 0.99],
		},
	},
}

const icon = {
	show: {
		opacity: 1,
		filter: 'blur(0px)',
		transition: {
			duration: 0.25,
			delay: 0.1,
		},
	},
	hidden: {
		opacity: 0,
		filter: 'blur(16px)',
		transition: {
			duration: 0.25,
		},
	},
}

function Dock() {
	const [show, setShow] = useState(false)
	return (
		<div className='fixed bottom-10 left-0 right-0 flex justify-center'>
			<motion.div
				layout
				variants={container}
				initial='hidden'
				animate='show'
				onAnimationComplete={() => setShow(true)}
				className='border bg-white p-2'
			>
				<div>
					<div className='flex items-center gap-2'>
						<TwitterLogoIcon className='h-4 w-4' />
						<GitHubLogoIcon />
						<Separator orientation='vertical' />
						<EnvelopeClosedIcon />
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export { Dock }
