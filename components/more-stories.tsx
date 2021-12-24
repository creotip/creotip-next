import PostPreview from './post-preview'
import Post from '../types/post'
import { Box, Grid, SimpleGrid } from '@chakra-ui/react'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      {/*<Box as="h2">More Stories</Box>*/}
      <SimpleGrid columns={[1, 1, 2]} gridGap="40px">
        {posts.map((post) => (
          <PostPreview key={post.slug} {...post} />
        ))}
      </SimpleGrid>
    </section>
  )
}

export default MoreStories
