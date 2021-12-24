import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type { Author } from 'types/author'
import { Box, Divider, Flex, Tag, useColorModeValue } from '@chakra-ui/react'
import type { Post } from 'types/post'

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
}: Post) => {
  const mode = useColorModeValue('light', 'dark')

  return (
    <Box
      as="section"
      // boxShadow="xl"
      backgroundColor={mode === 'dark' ? 'gray.700' : 'gray.100'}
      rounded="md"
      p="6"
      // border={mode === 'dark' ? '1px solid #dadada45' : '1px solid transparent'}
    >
      {/*<Box mb="1rem">*/}
      {/*  <CoverImage slug={slug} title={title} src={coverImage} />*/}
      {/*</Box>*/}

      <Box as="h2" fontWeight="600" fontSize="1.3rem" mb="1rem">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </Box>
      {/*<Divider mb={3} />*/}
      <Flex mb="0.5rem" fontSize="13px" alignItems="center">
        {/*<Avatar name={author.name} picture={author.picture} />*/}
        {/*<DateFormatter dateString={date} /> <Box mx=".5rem"> • </Box>*/}
        {/*<Box>by {author.name}</Box>*/}
        {/*{tags.map((item: string) => (*/}
        {/*  <Tag key={item} mr={2}>*/}
        {/*    {item}*/}
        {/*  </Tag>*/}
        {/*))}*/}
      </Flex>

      <Box>
        <Box as="p" mb={4}>
          {excerpt}
        </Box>
        <Flex mb="0.5rem" fontSize="13px" alignItems="center">
          {/*<Avatar name={author.name} picture={author.picture} />*/}
          {/*<DateFormatter dateString={date} /> <Box mx=".5rem"> • </Box>*/}
          {/*<Box>by {author.name}</Box>*/}
          {tags.map((item: string) => (
            <Tag
              key={item}
              mr={2}
              colorScheme={mode === 'dark' ? 'gray' : 'blackAlpha'}
            >
              {item}
            </Tag>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export default PostPreview
