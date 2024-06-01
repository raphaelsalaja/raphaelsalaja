import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import useMeasure from 'react-use-measure'
import { Separator } from './ui/separator'

function Profile() {
	const [show, setShow] = useState(false)
	const [ref, bounds] = useMeasure()

	return (
		<motion.div
			animate={{ height: bounds.height > 0 ? bounds.height : 'auto' }}
			transition={{ type: 'spring', bounce: 0.15, duration: 0.75 }}
		>
			<div ref={ref} className='flex flex-col gap-4'>
				<h1 className='home'>Raphael Salaja</h1>

				<motion.button
					onClick={() => setShow(!show)}
					className='size-fit'
					style={{
						backgroundColor: '#D5EFFF',
						color: '#5EB1EF',
					}}
				>
					Genreless Creator / (ˈʒɑːnrəlɪs krɪˈeɪtər) / noun
				</motion.button>

				<AnimatePresence mode='wait'>
					{show && (
						<motion.div
							initial={{
								opacity: 0,
								filter: 'blur(8px)',
								willChange: 'opacity, filter',
							}}
							animate={{
								opacity: 1,
								filter: 'blur(0px)',
								willChange: 'opacity, filter',
							}}
							exit={{
								opacity: 0,
								filter: 'blur(8px)',
								willChange: 'opacity, filter',
							}}
							transition={{ duration: 0.5 }}
							className='flex flex-col gap-4'
						>
							<ol className='ml-[1em] list-outside list-decimal justify-center space-y-2'>
								<li>
									An individual who defies traditional categorisation within
									creative endeavours, blending diverse influences and mediums to
									produce innovative works.
								</li>
								<li>
									A multidisciplinary artist who transcends boundaries, creating
									without limitations.
								</li>
							</ol>
							<Separator />
							<div className='flex flex-col gap-2'>
								<span className='flex gap-4 underline'>
									<Link href='mailto:raphaelsalaja@gmail.com'>Email ↗</Link>
									<Link href='https://twitter.com/raphaelsalaja'>Twitter ↗</Link>
									<Link href='https://github.com/rafunderscore'>Github ↗</Link>
									<Link href='https://zora.co/@raphaelsalaja'>Zora ↗</Link>
									<Link href='https://bento.me/raphaelsalaja'>Bento ↗</Link>
								</span>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	)
}

export { Profile }
