import Avatar from './avatar'
import DateFormatter from './date-formatter'
import Link from 'next/link'
import type { Author } from '../types/author'
import { Box } from '@chakra-ui/react'
import Image from 'next/image'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <Box as="section" mb="40px">
      <Box className="cover-image " w="100%" h="300px" pos="relative">
        <Image
          layout="fill"
          src={coverImage}
          alt={`Cover Image for ${title}`}
          priority
          objectFit="cover"
        />
      </Box>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </Box>
  )
}

export default HeroPost
