/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Layout from 'components/layout'
import { getSeo } from 'lib/getSeo'
import SEO from 'components/seo'
import { replaceWhitespace } from 'lib/utils'
import PostTitle from 'components/post-title'
import { Box, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import DateFormatter from 'components/date-formatter'
import Head from 'next/head'
import Container from 'components/container'
import Href from 'components/Href'
import { ArticleJsonLd } from 'next-seo'

const About = () => {
  const seo = getSeo()
  return (
    <Layout>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SEO
        {...seo}
        twitter={{
          handle: '@handle',
          site: '@creotip',
          cardType: 'summary_large_image',
        }}
        openGraph={{
          url: '/about',
          title: `About me`,
          description: `My name is Ruslan Elishaev. Fullstack developer, father and husband. I'm passionate about technology, history and politics.`,
          images: [
            {
              url: replaceWhitespace(
                `https://og-image-creotip.vercel.app/About-me.png?theme=dark`
              ),
              width: 800,
              height: 600,
              alt: `About me`,
              type: 'image/png',
            },
          ],
          site_name: 'creotip.io',
        }}
        title="About me"
        description="My name is Ruslan Elishaev. Fullstack developer, father and husband. I'm passionate about technology, history and politics."
      />
      <ArticleJsonLd
        url="/about"
        title="About me"
        images={[
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ]}
        datePublished="2015-02-05T08:00:00+08:00"
        dateModified="2015-02-05T09:00:00+08:00"
        authorName={['Jane Blogs', 'Mary Stone']}
        publisherName="Gary Meehan"
        publisherLogo="https://www.example.com/photos/logo.jpg"
        description="This is a mighty good description of this article."
      />

      <Container mt={10}>
        <PostTitle fontFamily="inherit" fontWeight="800" textAlign="center">
          About me
        </PostTitle>
        <Flex
          mb={5}
          alignItems="center"
          fontSize="sm"
          textAlign="center"
          justifyContent="center"
        >
          <DateFormatter dateString={'2022-01-18T16:43:32.340Z'} />
        </Flex>

        <Text>Hi!</Text>
        <Text>My name is Ruslan.</Text>
        <Text mb={5}>
          I'm a full-stack developer for almost 10 years, with a deep knowledge
          of HTML, CSS, Javascript, React.js and Node.js. I'm passionate about
          technology, so in this blog, I'm going to share my knowledge and
          experience.
        </Text>

        <Text mb={5}>
          Also I have an immense interest in{' '}
          <Href url="https://en.wikipedia.org/wiki/Web3">Web3</Href>,
          blockchains and cryptocurrency. There is tons of information to
          digest, so i'm learning every day.
        </Text>

        <Text mb={5}>
          This blog will help you stay up-to-date on the latest developments in
          all areas of the fullstack world. Filled with tips, tutorials, and
          industry insights, you can use this blog as a valuable resource that
          can help you keep your skills relevant and up-to-date.
        </Text>
        <Text mb={5}>
          I want to be honest. My writing skills are limited so i will try to be
          as much as informative as i can with clear step-by-step guides.
        </Text>
        <Text mb={5}>
          No another{' '}
          <Box
            as="a"
            href="https://www.google.com/search?q=how+to+create+counter+in+react"
            color="green.500"
          >
            <em>"How to create counter in react"</em>
          </Box>{' '}
          blog post. I promise!
        </Text>
        <Text mb={5}>
          Let's list the most interesting topics that I'm going to write
          about...
        </Text>

        <Box>
          <Box as="h2" apply="mdx.h2">
            React, hooks, state management, and UI
          </Box>
          <Text mb={5}>
            I love React! Developing with React since 2016. Nowadays I love
            React even more than before. I like how React team shifted to a
            functional paradigm, I like hooks and the echo system. React is even
            greater with additional libraries and frameworks from the community,
            such as
          </Text>
          <UnorderedList>
            <ListItem>
              <Href url="https://nextjs.org/">Next.js</Href> or{' '}
              <Href url="https://www.gatsbyjs.com/">Gatsby.js</Href> for
              framework
            </ListItem>
            <ListItem>
              <Href url="https://www.apollographql.com/docs/react/">
                Apollo Client
              </Href>{' '}
              for a GraphQL client
            </ListItem>
            <ListItem>
              <Href url="https://redux.js.org/">Redux</Href> or{' '}
              <Href url="https://recoiljs.org/">Recoil</Href> for state
              management
            </ListItem>
            <ListItem>
              <Href url="https://chakra-ui.com/">Chakra UI</Href> for UI
              components and styled-system
            </ListItem>
            <ListItem>
              <Href url="https://emotion.sh/docs/introduction">Emotion</Href>{' '}
              for styled components
            </ListItem>
            <ListItem>
              <Href url="https://react-icons.github.io/react-icons/">
                react-icons
              </Href>{' '}
              for svg icon components
            </ListItem>
          </UnorderedList>
          <Text>And many more...</Text>
        </Box>

        <Box>
          <Box as="h2" apply="mdx.h2">
            Node.js, Microservices, and Express.js
          </Box>
          <Text>
            I will focus mainly on the echo-system of{' '}
            <Href url="https://nodejs.org/en/">Node.js</Href>, and powerful
            microservices architecture structural style. We will extend the
            abilities of Node.js. with{' '}
            <Href url="https://expressjs.com/">Express.js</Href> as an
            unopinionated framework that fits perfectly to the microservices
            architecture.
          </Text>
        </Box>

        <Box>
          <Box as="h2" apply="mdx.h2">
            GraphQL
          </Box>

          <Text>
            <Href url="https://graphql.org/">GraphQL</Href> is perfect
            alternative to the Rest API. GraphQL provides us the ability to
            communicate from the client to the backend with just single
            endpoint. Schemas, Fragmennt anf Mutations, those are the keys to
            synchronise the client with GraphQL backend.
          </Text>
        </Box>

        <Box>
          <Box as="h2" apply="mdx.h2">
            Docker and Kubernetes
          </Box>

          <Text>Will write later on this topic</Text>
        </Box>
      </Container>
    </Layout>
  )
}

export default About