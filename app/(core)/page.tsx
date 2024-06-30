import * as motion from '@/components/framer-motion/motion'
import { Separator } from '@/components/ui/separator'
import releases from '@/data/press.json'
import { getPosts } from '@/lib/mdx-utils'
import { Link } from 'next-view-transitions'

interface Project {
  slug: string
  metadata: {
    title: string
    date: string
  }
}

interface LinksProps {
  links: { href: string; title: string }[]
}

interface ProjectsProps {
  projects: Project[]
}

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(16px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(16px)' }}
      transition={{ type: 'spring', duration: 1.5, bounce: 0.25, delay: 0.25 }}
      className='relative flex flex-col gap-8'
    >
      <motion.div className='flex w-full flex-col gap-2'>
        <Profile />
      </motion.div>
      <motion.div className='flex w-full flex-col gap-2'>
        <Projects projects={getPosts({ folder: 'projects' })} />
      </motion.div>
      <motion.div className='flex w-full flex-col gap-2'>
        <Playground projects={getPosts({ folder: 'playground' })} />
      </motion.div>
      <motion.div className='flex w-full flex-col gap-2'>
        <Press />
      </motion.div>
    </motion.div>
  )
}

const Profile: React.FC = () => (
  <div className='flex flex-col gap-4'>
    <h1 className='home'>Raphael Salaja</h1>
    <div>Genreless Creator / (ˈʒɑːnrəlɪs krɪˈeɪtər) / noun</div>
    <div>
      An individual who defies traditional categorisation within creative endeavours, blending diverse influences and
      mediums to produce innovative works.
    </div>
    <div>A multidisciplinary artist who transcends boundaries, creating without limitations.</div>
    <Link href='/what-im-listening-to' className='underline underline-offset-1 transition-all hover:text-black'>
      Take a peek at my listening habits...
    </Link>
    <Links
      links={[
        { href: 'mailto:raphaelsalaja@gmail.com', title: 'Email' },
        { href: 'https://twitter.com/raphaelsalaja', title: 'Twitter' },
        { href: 'https://github.com/rafunderscore', title: 'Github' },
        { href: 'https://bento.me/raphaelsalaja', title: 'Works' },
        { href: 'https://read.cv/raphaelsalaja', title: 'CV' },
        { href: 'https://zora.co/@raphaelsalaja', title: 'Zora' }
      ]}
    />
  </div>
)

const Links: React.FC<LinksProps> = ({ links }) => (
  <div className='flex flex-wrap gap-4'>
    {links.map(({ href, title }) => (
      <Link key={title} href={href} className='underline underline-offset-1 transition-all hover:text-black'>
        {title}
      </Link>
    ))}
  </div>
)

const Projects: React.FC<ProjectsProps> = ({ projects }) => (
  <div className='flex flex-col gap-4'>
    <h1>Projects</h1>
    {projects.map((project) => (
      <Link
        key={project.slug}
        href={`projects/${project.slug}`}
        className='-mx-4 flex items-center gap-2 whitespace-nowrap text-nowrap rounded-lg px-4 py-3 transition-all hover:bg-gray-100/50'
      >
        {project.metadata.title}
        <Separator orientation='horizontal' className='shrink' />
        {project.metadata.date}
      </Link>
    ))}
  </div>
)

const Playground: React.FC<ProjectsProps> = ({ projects }) => (
  <div className='flex flex-col gap-4'>
    <h1>Playground</h1>
    {projects.map((project) => (
      <Link
        key={project.slug}
        href={`playground/${project.slug}`}
        className='-mx-4 flex items-center gap-2 whitespace-nowrap text-nowrap rounded-lg px-4 py-3 transition-all hover:bg-gray-100/50'
      >
        {project.metadata.title}
        <Separator orientation='horizontal' className='shrink' />
        {project.metadata.date}
      </Link>
    ))}
  </div>
)

const Press: React.FC = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h1>Press</h1>
      {releases
        .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
        .map((release) => (
          <Link
            key={release.title}
            href={release.link}
            className='-mx-4 flex items-center gap-2 whitespace-nowrap text-nowrap rounded-lg px-4 py-3 transition-all hover:bg-gray-100/50'
          >
            {release.title}
            <Separator orientation='horizontal' className='shrink' />
            {release.published}
          </Link>
        ))}
    </div>
  )
}
