import Layout from 'components/layout'
import Container from 'components/container'
import SEO from 'components/seo'
import { getAllPosts } from 'lib/api'
import dynamic from 'next/dynamic'
import type { PostType } from 'types/post'

const DynamicHeroPost = dynamic(() => import('components/hero-post'))
const DynamicMoreStories = dynamic(() => import('components/more-stories'))

type Props = {
  allPosts: PostType[]
}

const Home = ({ allPosts }: Props) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <Layout>
      <SEO title="A blog for fullstack comrades" />

      <Container>
        {heroPost && (
          <DynamicHeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <DynamicMoreStories posts={morePosts} />}
      </Container>
    </Layout>
  )
}

export default Home

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
