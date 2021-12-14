import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type { Author } from '../types/author'
import { Box } from '@chakra-ui/react'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <Box>
      {/*<Box mb="1rem">*/}
      {/*  <CoverImage slug={slug} title={title} src={coverImage} />*/}
      {/*</Box>*/}

      <Box as="h2" fontWeight="800" fontSize="1.3rem" mb="1rem">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </Box>
      <Box mb="0.5rem">
        <DateFormatter dateString={date} />
      </Box>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </Box>
  )
}

export default PostPreview
