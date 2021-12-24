import type { Author } from './author'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface Post {
  slug: string
  title: string
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
