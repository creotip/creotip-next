import Avatar from './avatar'
import DateFormatter from './date-formatter'
import Link from 'next/link'
import type { Author } from 'types/author'
import {
  Badge,
  Box,
  Flex,
  Tag,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import Image from 'next/image'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  tags: string[]
}

// const shimmer = (w: number, h: number) => `
// <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g">
//       <stop stop-color="#d5d5d5" offset="20%" />
//       <stop stop-color="#d0cece" offset="50%" />
//       <stop stop-color="#d5d5d5" offset="70%" />
//     </linearGradient>
//   </defs>
//   <rect width="${w}" height="${h}" fill="#d5d5d5" />
//   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
// </svg>`
//
// const toBase64 = (str: string) =>
//   typeof window === 'undefined'
//     ? Buffer.from(str).toString('base64')
//     : window.btoa(str)

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
}: Props) => {
  const mode = useColorModeValue('light', 'dark')

  return (
    <Box
      as="section"
      mb="40px"
      // boxShadow="xl"
      rounded="md"
      p="6"
      backgroundColor={mode === 'dark' ? 'gray.700' : 'gray.100'}
    >
      <Box>
        <Box
          as="h2"
          lineHeight="1.3"
          fontWeight="800"
          fontSize={['1.5rem', '2rem']}
          mb="1rem"
        >
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="hover:underline">{title}</a>
          </Link>
        </Box>
        <Flex mb="0.5rem" fontSize="13px" alignItems="center">
          {/*<Avatar name={author.name} picture={author.picture} />*/}
          {/*<DateFormatter dateString={date} /> <Box mx=".5rem"> • </Box>*/}
          {/*<Box>by {author.name}</Box>*/}
          {/*{tags.map((item: string) => (*/}
          {/*  <Tag key={item} mr={2} colorScheme="purple">*/}
          {/*    {item}*/}
          {/*  </Tag>*/}
          {/*))}*/}
        </Flex>
      </Box>
      <div>
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
      </div>
    </Box>
  )
}

export default HeroPost
