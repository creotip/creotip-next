import Avatar from './avatar'
import DateFormatter from './date-formatter'
import Link from 'next/link'
import type { Author } from '../types/author'
import { Box, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react'
import Image from 'next/image'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
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
}: Props) => {
  const mode = useColorModeValue('light', 'dark')

  return (
    <Box
      as="section"
      mb="40px"
      boxShadow="xl"
      rounded="md"
      p="6"
      border={mode === 'dark' ? '1px solid #dadada45' : '1px solid transparent'}
    >
      <Box>
        <Box as="h2" fontWeight="600" fontSize="1.3rem" mb="1rem">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="hover:underline">{title}</a>
          </Link>
        </Box>
        <Flex mb="0.5rem" fontSize="sm" alignItems="center">
          <Avatar name={author.name} picture={author.picture} />
          <DateFormatter dateString={date} />
        </Flex>
      </Box>
      <div>
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      </div>
    </Box>
  )
}

export default HeroPost
