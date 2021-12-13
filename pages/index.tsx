import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Box, Flex } from '@chakra-ui/react'
import Layout from '../components/layout'
import Container from '../components/container'
import Intro from '../components/intro'
import type { PostType } from '../types/post'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import { getAllPosts } from 'lib/api'
import Header from '../components/header'
import SEO from 'components/seo'

type Props = {
  allPosts: PostType[]
}

const Home = ({ allPosts }: Props) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <Layout>
      <SEO title="creotip - fullstack blog" />

      <Header />

      <Container>
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by {/*<span>*/}
          {/*  <Image*/}
          {/*    src="/vercel.svg"*/}
          {/*    alt="Vercel Logo"*/}
          {/*    layout="fixed"*/}
          {/*    width={72}*/}
          {/*    height={16}*/}
          {/*  />*/}
          {/*</span>*/}
        </a>
      </footer>
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
