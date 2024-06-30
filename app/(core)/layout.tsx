import { og } from '@/config/site'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: og.title,
  description: og.description,
  keywords: og.keywords,
  authors: og.authors,
  creator: og.creator,
  openGraph: og.openGraph,
  twitter: og.twitter,
  metadataBase: new URL(og.url),
  manifest: `${og.url}/site.webmanifest`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body className='relative flex items-center justify-center'>
          <div className='relative flex w-full max-w-[640px] flex-col justify-start gap-8 px-8 py-16'>{children}</div>
        </body>
      </html>
    </ViewTransitions>
  )
}
