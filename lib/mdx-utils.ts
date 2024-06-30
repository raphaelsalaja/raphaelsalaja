import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { Metadata } from '@/types/metadata'

function parseFrontmatter(fileContent: string) {
  const { data, content } = matter(fileContent)

  const metadata: Metadata = {
    slug: '',
    title: data.title || '',
    date: data.date || '',
    summary: data.summary || '',
    tags: data.tags || [],
    live: data.live || ''
  }

  return { metadata, content }
}

function getMDXFiles(dir: string) {
  const files = fs.readdirSync(dir)
  return files.filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function parseDate(dateString: string) {
  const [month, year] = dateString.split(' ')
  return new Date(`${month} 1, ${year}`)
}

function getPosts({ folder }: { folder: string } = { folder: 'projects' }) {
  const dir = path.join(process.cwd(), 'app', '(core)', folder, 'posts')

  const mdxFiles = getMDXFiles(dir)

  const posts = mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    return {
      metadata: { ...metadata, slug },
      slug,
      content
    }
  })

  posts.sort((a, b) => {
    const dateA = parseDate(a.metadata.date)
    const dateB = parseDate(b.metadata.date)
    return dateB.getTime() - dateA.getTime()
  })

  return posts
}

export { getPosts }
