import Layout from 'components/layout'
import Container from 'components/container'
import SEO from 'components/seo'
import { getAllPosts } from 'lib/api'
import dynamic from 'next/dynamic'
import type { Post } from 'types/post'
import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

const DynamicHeroPost = dynamic(() => import('components/hero-post'))
const DynamicMoreStories = dynamic(() => import('components/more-stories'))

type Props = {
  allPosts: Post[]
}

const Home = ({ allPosts }: Props) => {
  const mode = useColorModeValue('light', 'dark')
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <Layout>
      <SEO title="Creotip - A blog for fullstack comrades" />
      <Flex
        className="banner"
        justifyContent="center"
        alignItems="center"
        bg={
          mode === 'light'
            ? 'linear-gradient(to right, rgb(227 234 241), #fafbfd)'
            : 'linear-gradient(to right, rgb(26 32 43), #455062)'
        }
        clipPath={[
          'polygon(50% 0%, 100% 0, 100% 75%, 50% 100%, 0 75%, 0 0)',
          'polygon(50% 0%, 100% 0, 100% 65%, 50% 100%, 0 65%, 0 0)',
          'polygon(50% 0%, 100% 0, 100% 25%, 50% 100%, 0 25%, 0 0)',
        ]}
        p={['2rem 0', '2rem 0', '4rem 0']}
        mb="1rem"
        flexDir="column"
      >
        <Box
          as="h1"
          fontWeight={['300', '200']}
          fontSize={['1.3rem', '1.4rem', '2rem']}
        >
          A Blog for FullStack Comrades
        </Box>
        <Box>※</Box>
        <Box textAlign="center" fontSize="0.9rem" color="gray.400">
          Javascript, React, Apollo, Node.js, Mongodb,
          <br /> Microservices, Docker, Kubernetes...
        </Box>
      </Flex>
      <Container>
        {heroPost && <DynamicHeroPost {...heroPost} />}
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
    'tags',
  ])

  return {
    props: { allPosts },
  }
}
