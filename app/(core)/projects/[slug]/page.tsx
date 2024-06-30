import { Separator } from '@/components/ui/separator'
import { ViewProductionButton } from '@/components/view-production-button'
import { getPosts } from '@/lib/mdx-utils'
import { MDX } from '@/mdx-components'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Link } from 'next-view-transitions'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  let posts = getPosts()

  return posts.map((post: { slug: any }) => ({
    slug: post.slug
  }))
}

export function generateMetadata({ params }: { params: any }) {
  let post = getPosts().find((post) => post.slug === params.slug)

  if (!post) {
    return
  }

  let { title, date: date, summary: description } = post.metadata

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      date,
      url: `https://raphaelsalaja.com/projects/${post.slug}`,
      images: ['https://raphaelsalaja.com/api/og?title=' + encodeURIComponent(title)]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://raphaelsalaja.com/api/og?title=' + encodeURIComponent(title)]
    }
  }
}

export default function Blog({ params }: { params: any }) {
  let posts = getPosts({ folder: 'projects' })
  let postIndex = posts.findIndex((post) => post.slug === params.slug)
  let post = posts[postIndex]

  if (!post) {
    notFound()
  }

  let previousPost = posts[postIndex - 1] || null
  let nextPost = posts[postIndex + 1] || null

  return (
    <div>
      <div className='mb-4 flex flex-col gap-2'>
        <div className='flex justify-between'>
          <Link
            href='/'
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 md:absolute md:-translate-x-60'
          >
            <ArrowLeftIcon />
            <h2>Home</h2>
          </Link>
          <h1 className='view-transition-project-heading'>{post.metadata.title}</h1>
          <h2>{post.metadata.date}</h2>
        </div>
      </div>

      <MDX source={post.content} />

      {post.metadata.live && <ViewProductionButton href={post.metadata.live} />}

      <Separator className='my-8' />

      <div className='flex w-full items-end justify-between text-sm'>
        {previousPost ? (
          <Link href={`/projects/${previousPost.slug}`} className='flex flex-col items-start gap-1'>
            <div>Previous</div>
            <div className='text-black'>{previousPost.metadata.title}</div>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={`/projects/${nextPost.slug}`} className='flex flex-col items-end gap-1'>
            <div>Next</div>
            <div className='text-black'>{nextPost.metadata.title}</div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
