import DateFormatter from './date-formatter'
import Link from 'next/link'
import type { Author } from 'types/Author'
import { Box, Divider, Flex, Tag, useColorModeValue } from '@chakra-ui/react'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  tags: string[]
  isHero: boolean
}

const PostItem = ({ title, date, excerpt, slug, tags, isHero }: Props) => {
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
          fontWeight="800"
          fontSize={isHero ? ['1.6rem', '1.8rem'] : ['1.4rem', '1.6rem']}
          mb="1rem"
          transition="all 300ms ease-in-out"
          _hover={{
            opacity: '0.6',
          }}
        >
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <span className="hover:underline">{title}</span>
          </Link>
        </Box>
      </Box>
      <div>
        <Box as="p" mb={4}>
          {excerpt}
        </Box>
        <Divider mb={5} />
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Flex fontSize="13px" alignItems="center" flexWrap="wrap">
            {tags &&
              tags.map((item: string) => (
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
