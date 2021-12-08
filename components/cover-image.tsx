import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@chakra-ui/react'

type Props = {
  title: string
  src: string
  slug?: string
}

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image layout="fill" src={src} alt={`Cover Image for ${title}`} />
  )
  return (
    <Box className="cover-image " w="100%" h="300px" pos="relative">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </Box>
  )
}

export default CoverImage
