import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type { Author } from '../types/author'
import { Box, Divider, Flex, useColorModeValue } from '@chakra-ui/react'

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
  const mode = useColorModeValue('light', 'dark')

  return (
    <Box
      as="section"
      boxShadow="xl"
      rounded="md"
      p="6"
      border={mode === 'dark' ? '1px solid #dadada45' : '1px solid transparent'}
    >
      {/*<Box mb="1rem">*/}
      {/*  <CoverImage slug={slug} title={title} src={coverImage} />*/}
      {/*</Box>*/}

      <Box as="h2" fontWeight="600" fontSize="1.3rem" mb="1rem">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </Box>
      <Divider mb={3} />
      <Flex mb="0.5rem" fontSize="13px" alignItems="center">
        {/*<Avatar name={author.name} picture={author.picture} />*/}
        <DateFormatter dateString={date} /> <Box mx=".5rem"> • </Box>
        <Box>by {author.name}</Box>
      </Flex>

      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </Box>
  )
}

export default PostPreview
