import { Link } from 'next-view-transitions'

function Profile() {
	return (
		<div className='flex flex-col gap-4'>
			<h1 className='home'>Raphael Salaja</h1>

			<div>Genreless Creator / (ˈʒɑːnrəlɪs krɪˈeɪtər) / noun</div>

			<div>
				An individual who defies traditional categorisation within creative endeavours,
				blending diverse influences and mediums to produce innovative works. A
				multidisciplinary artist who transcends boundaries, creating without limitations.
			</div>

			<div className='flex flex-col gap-2'>
				<span className='flex gap-4 underline'>
					<Link href='mailto:raphaelsalaja@gmail.com'>Email ↗</Link>
					<Link href='https://twitter.com/raphaelsalaja'>Twitter ↗</Link>
					<Link href='https://github.com/rafunderscore'>Github ↗</Link>
					<Link href='https://zora.co/@raphaelsalaja'>Zora ↗</Link>
					<Link href='https://bento.me/raphaelsalaja'>Bento ↗</Link>
				</span>
			</div>
		</div>
	)
}

export { Profile }
