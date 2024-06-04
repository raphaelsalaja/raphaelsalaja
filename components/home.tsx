'use client'

import { Profile } from '@/components/profile'
import { Projects } from '@/components/projects'

import { motion } from 'framer-motion'
import { Playground } from './playground'



const article = {
	hidden: {
		opacity: 0,
		filter: 'blur(16px)',
	},
	show: {
		opacity: 1,
		filter: 'blur(0px)',
		transition: {
			type: 'spring',
			duration: 1.5,
			bounce: 0.25,
			delay: 0.25,
		},
	},
}

function Home({ projects, headless }: { projects: any[]; headless: any[] }) {
	return (
		<motion.article
			className='relative flex flex-col gap-8'
			variants={article}
			initial='hidden'
			animate='show'
		>
			<motion.section className='flex w-full flex-col gap-2'>
				<Profile />
			</motion.section>
			<motion.section  className='flex w-full flex-col gap-2'>
				<Projects projects={projects} />
			</motion.section>
			<motion.section className='flex w-full flex-col gap-2'>
				<Playground projects={headless} />
			</motion.section>
		</motion.article>
	)
}

export { Home }
