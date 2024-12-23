import type { Post } from '@/types/post'

import { formatter } from '@/lib/formatter'
import { getPosts } from '@/lib/mdx'
import { MDX } from '@/mdx-components'

import React from 'react'

interface Props {
  post: Post
  route: string
}

export const Layout = ({ post, route }: Props) => {
  const posts = getPosts(route)

  const Seperator = () => {
    return <div>⋅</div>
  }

  const PublishedTime = () => {
    return <div>Published {formatter.date(new Date(post.time.created))}</div>
  }
  const UpdateTime = () => {
    return <div>Updated {formatter.date(new Date(post.time.updated))}</div>
  }

  return (
    <React.Fragment>
      <div className='flex flex-col'>
        <div>
          <h1>{post.title}</h1>
        </div>
        <div className='text-small mt-1 flex gap-2 text-muted'>
          <PublishedTime />
          <Seperator />
          <UpdateTime />
          <Seperator />
        </div>
      </div>

      <MDX source={post.content} />
    </React.Fragment>
  )
}
