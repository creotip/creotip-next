import type { Author } from './Author'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: MDXRemoteSerializeResult
  tags: string[]
}

export default Post
