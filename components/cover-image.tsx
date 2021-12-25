import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@chakra-ui/react'

type Props = {
  title: string
  src: string
  slug?: string
  base64: string
}

const CoverImage = ({ title, src, slug, base64 }: Props) => {
  const image = (
    <Image
      itemProp="image"
      width={700}
      height={375}
      layout="responsive"
      src={src}
      alt={`Cover Image for ${title}`}
      blurDataURL={base64}
      placeholder="blur"
      priority
    />
  )
  return (
    <Box
      position="relative"
      w="100%"
      h="100%"
      boxShadow="2xl"
      rounded="md"
      overflow="hidden"
    >
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
