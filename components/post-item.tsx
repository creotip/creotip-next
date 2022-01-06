import DateFormatter from './date-formatter'
import Link from 'next/link'
import type { Author } from 'types/author'
import { Box, Divider, Flex, Tag, useColorModeValue } from '@chakra-ui/react'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  tags: string[]
}

const PostItem = ({ title, date, excerpt, slug, tags }: Props) => {
  const mode = useColorModeValue('light', 'dark')

  return (
    <Flex
      as="section"
      flexDir="column"
      justifyContent="space-between"
      mb="40px"
      rounded="md"
      p="6"
      backgroundColor={mode === 'dark' ? 'gray.700' : 'gray.100'}
    >
      <Box>
        <Box
          as="h2"
          lineHeight="1.3"
          fontWeight="700"
          fontSize={['1.5rem', '2rem']}
          mb="1rem"
        >
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="hover:underline">{title}</a>
          </Link>
        </Box>
        <Flex mb="0.5rem" fontSize="13px" alignItems="center"></Flex>
      </Box>
      <div>
        <Box as="p" mb={4}>
          {excerpt}
        </Box>
        <Divider mb={5} />
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Flex fontSize="13px" alignItems="center" flexWrap="wrap">
            {tags.map((item: string) => (
              <Tag
                key={item}
                mr={2}
                colorScheme={mode === 'dark' ? 'gray' : 'blackAlpha'}
                mb="0.5rem"
              >
                {item}
              </Tag>
            ))}
          </Flex>
          <DateFormatter dateString={date} fontSize="sm" />
        </Flex>
      </div>
    </Flex>
  )
}

export default PostItem
