import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { MDXComponents } from 'mdx/types'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { Link } from 'next-view-transitions'
import { ImageProps } from 'next/image'

import dynamic from 'next/dynamic'
import React from 'react'

import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'

import '@/styles/mdx.css'

const ArenaGraphExample = dynamic(() => import('@/components/graph-example'), {
  ssr: false
})

const DelayedButton = dynamic(() => import('@/components/playground/button-delayed-icon'), {
  ssr: false
})

const ExpandableBlock = dynamic(() => import('@/components/playground/expandable-block'), {
  ssr: false
})

const Metadata = dynamic(() => import('@/components/playground/metadata-dialog'), {
  ssr: false
})

const SharedAnimation = dynamic(() => import('@/components/playground/shared-animation'), {
  ssr: false
})

const FamilyWallet = dynamic(() => import('@/components/playground/family-wallet'), {
  ssr: false
})

const LinearDialog = dynamic(() => import('@/components/playground/linear-dialog'), {
  ssr: false
})

const BasicExample = dynamic(() => import('@/components/playground/linear-dialog-guide/1-example'), {
  ssr: false
})

const BasicLayoutExample = dynamic(() => import('@/components/playground/linear-dialog-guide/2-basic-layout-example'), {
  ssr: false
})

const Image = dynamic(() => import('@/components/image'), {
  ssr: true
})

const Video = dynamic(() => import('@/components/video'), {
  ssr: true
})

const Container = dynamic(() => import('@/components/headless-motion/container-example'), {
  ssr: false
})

const components: MDXComponents = {
  pre: ({ children }) => (
    <pre
      className='border bg-muted py-2'
      style={{
        marginBottom: '1.5rem'
      }}
    >
      {children}
    </pre>
  ),
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn('mb-2 mt-6', className)} {...props} style={{ margin: '1.5rem 0rem 0.5rem 0rem' }} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('mb-4', className)} {...props} />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a className={cn('underline underline-offset-4', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li
      className={cn('ml-2 mt-2', className)}
      {...props}
      style={{
        marginTop: '0.5rem',
        marginLeft: '1rem'
      }}
    />
  ),
  Link: ({ children, href, ...props }) => <Link href={href}>{children}</Link>,
  Showcase: ({ children, caption }) => (
    <div className='my-6 flex flex-col justify-end gap-2'>
      <div
        className='overflow-hidden border'
        style={{
          height: '24rem'
        }}
      >
        <div className='h-full'>{children}</div>
      </div>
      {caption && <p className='text-center text-xs text-gray-500'>{caption}</p>}
    </div>
  ),
  ArenaGraph: () => <ArenaGraphExample />,
  ComponentContainer: ({ children, caption, code }) => (
    <div className={`relative my-6 flex flex-col gap-2 ${code ? 'mb-0' : ''}`}>
      <div
        className='absolute flex w-full gap-2 p-2'
        style={{
          justifyContent: 'flex-end'
        }}
      ></div>
      <div
        className={cn('relative overflow-hidden', code ? 'border-x border-b-0 border-t' : 'border')}
        style={{
          height: '24rem',
          border: '1px  solid #e5e7eb',
          borderBottom: code ? '0' : '1px solid #e5e7eb'
        }}
      >
        <div className='flex h-full items-center justify-center'>{children}</div>
      </div>
      {caption && <p className='text-center text-xs text-gray-500'>{caption}</p>}
    </div>
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn('relative rounded bg-muted font-mono text-xs', className)}
      style={{
        padding: '0.1rem 0.3rem'
      }}
      {...props}
    />
  ),
  CodeBlock: ({ children }) => <div className=''>{children}</div>,
  Image: ({ caption, ...props }: ImageProps & { caption?: string }) => {
    return <Image {...props} caption={caption} />
  },
  Video: ({ src, ...props }) => {
    return <Video src={src} {...props} />
  },
  PreetsLayout: ({}) => {
    return (
      <iframe
        src='https://codesandbox.io/embed/9r88w5?view=preview&module=%2Fsrc%2FApp.tsx&hidenavigation=1'
        style={{
          width: '100%',
          height: '500px',
          border: '0',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
        title="Framer Motion: Linear's Shared Layout Animation"
        allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
        sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
      />
    )
  },
  Container: () => <Container />,
  DelayedButton: () => <DelayedButton />,
  ExpandableBlock: () => <ExpandableBlock />,
  Metadata: () => <Metadata />,
  SharedAnimation: () => <SharedAnimation />,
  FamilyWallet: () => <FamilyWallet />,
  BasicLayoutExample: () => <BasicLayoutExample />,
  LinearDialog: () => <LinearDialog />,
  BasicExample: () => <BasicExample />,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
}

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [
      [rehypeSlug],
      [
        rehypePrettyCode,
        {
          theme: 'github-light',
          keepBackground: false,
          defaultLang: 'tsx',
          filterMetaString: (string: string) => string.replace(/filename="[^"]*"/, '')
        }
      ]
    ]
  }
}

export function MDX(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  // @ts-ignore
  return <MDXRemote {...props} components={components} options={options} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components
  }
}
