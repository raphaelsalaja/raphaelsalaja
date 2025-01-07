import { getPosts } from '@/lib/mdx'

import styles from './styles.module.scss'
import Link from 'next/link'
import Button from '@/components/button'
import type { Post } from '@/types/post'

interface PostProps {
  category: string
  inline?: boolean
}

export const Posts = ({ category, inline }: PostProps) => {
  const posts = getPosts(category)
    .slice(0, 4)
    .sort((a, b) => {
      return Number(new Date(b.time.created)) - Number(new Date(a.time.created))
    })

  if (posts.length === 0) {
    return null
  }

  const Thumbnail = ({ post }: { post: Post }) => {
    if (post.media) {
      if (post.media.video) {
        return (
          <video src={post.media.video} className={styles.thumbnail} autoPlay muted loop>
            <track kind='captions' />
          </video>
        )
      }

      if (post.media.image) {
        return <img src={post.media.image} className={styles.thumbnail} alt={post.title} />
      }

      if (post.media.audio) {
        return <audio src={post.media.audio} className={styles.thumbnail} controls />
      }
    }

    return (
      <div className={styles.thumbnail}>
        <span>{post.title}</span>
      </div>
    )
  }

  return (
    <div className={styles.posts}>
      {!inline && (
        <div className={styles.heading}>
          <span className={styles.title}>
            <h1>{category}</h1>
            <sup>{posts.length > 0 && `${posts.length}`}</sup>
          </span>

          <Button asChild variant='ghost'>
            <Link href='/'>View All</Link>
          </Button>
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.row}>
          {posts.slice(0, 2).map((post) => {
            return (
              <a href={`/${category}/${post.slug}`} className={styles.post} key={post.slug}>
                <Thumbnail post={post} />
                <div className={styles.details}>
                  <h1>{post.title}</h1>
                  <p>
                    {new Date(post.time.created).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </p>
                </div>
              </a>
            )
          })}
        </div>

        <div className={styles.row}>
          {posts.slice(2, 4).map((post) => {
            return (
              <a href={`/${category}/${post.slug}`} className={styles.post} key={post.slug}>
                <Thumbnail post={post} />
                <div className={styles.details}>
                  <h1>{post.title}</h1>
                  <p>
                    {new Date(post.time.created).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
