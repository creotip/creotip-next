import React from 'react'
import PostType from 'types/Post'
import { Box, List, ListItem, UnorderedList } from '@chakra-ui/react'
import Link from 'next/link'

type Props = {
  postsToRead: PostType[]
}

const RecommendedPosts = ({ postsToRead }: Props) => {
  return (
    <Box mb={10}>
      <Box as="h3" apply="mdx.h3" mb={3}>
        More Posts To Read
      </Box>
      <UnorderedList>
        {postsToRead.map(({ slug, title }) => (
          <ListItem key={slug} mb="1rem">
            <Link as={`/posts/${slug}`} href="/posts/[slug]" passHref>
              <Box
                as="a"
                className="hover:underline"
                apply="mdx.a"
                color="green.500"
              >
                {title}
              </Box>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default RecommendedPosts
