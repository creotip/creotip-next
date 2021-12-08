import PostPreview from './post-preview'
import Post from '../types/post'
import { Box, Grid } from '@chakra-ui/react'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <Box as="h2">More Stories</Box>
      <Grid gridGap="40px">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </Grid>
    </section>
  )
}

export default MoreStories
