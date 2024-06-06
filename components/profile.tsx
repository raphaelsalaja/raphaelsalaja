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

			<Links
				links={[
					{ href: 'mailto:raphaelsalaja@gmail.com', title: 'Email' },
					{ href: 'https://twitter.com/raphaelsalaja', title: 'Twitter' },
					{ href: 'https://github.com/rafunderscore', title: 'Github' },
					{ href: 'https://bento.me/raphaelsalaja', title: 'Works Gallery' },
					{ href: 'https://read.cv/raphaelsalaja', title: 'CV' },
					{ href: 'https://zora.co/@raphaelsalaja', title: 'Zora' },
				]}
			/>
		</div>
	)
}

function Links({ links }: { links: any[] }) {
	return (
		<div className='flex gap-4'>
			{links.map(({ href, title }) => (
				<Link
					key={title}
					href={href}
					className='underline underline-offset-1 transition-all hover:text-black'
				>
					{title} ↗
				</Link>
			))}
		</div>
	)
}

export { Profile }
