import Layout from 'components/layout'
import { getSeo } from 'lib/getSeo'
import SEO from 'components/seo'
import { replaceWhitespace } from 'lib/utils'
import PostTitle from 'components/post-title'
import {
  Box,
  Divider,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import DateFormatter from 'components/date-formatter'
import Container from 'components/container'
import Href from 'components/Href'
import { ArticleJsonLd } from 'next-seo'
import siteConfig from 'configs/site-config'

const pageConfig = {
  title: 'My Projects',
  description:
    'This is a list of my projects, open source contributions, and other tasks I have worked on.',
  slug: 'projects',
  postURL: `${siteConfig.seo.siteUrl}/projects`,
  datePublished: '2022-02-08T07:58:33.266Z',
  dateModified: '2022-02-08T07:58:33.266Z',
  authorName: 'Ruslan Elishaev',
  publisherName: 'creotip.io',
  publisherLogo: `${siteConfig.seo.siteUrl}/logo.png`,
  ogImage: `https://og-image-creotip.vercel.app/My%20Projects.png?theme=dark`,
}

const Projects = () => {
  const seo = getSeo()

  const {
    title,
    description,
    datePublished,
    dateModified,
    authorName,
    publisherName,
    publisherLogo,
    postURL,
    ogImage,
  } = pageConfig

  return (
    <Layout>
      <SEO
        {...seo}
        title={title}
        description={description}
        canonical={postURL}
        openGraph={{
          url: postURL,
          title: title,
          description: description,
          images: [
            {
              url: replaceWhitespace(ogImage),
              width: 800,
              height: 600,
              alt: `About Me`,
              type: 'image/png',
            },
          ],
          site_name: 'creotip.io',
        }}
      />
      <ArticleJsonLd
        url={postURL}
        title="About Me"
        images={[replaceWhitespace(ogImage)]}
        datePublished={datePublished}
        dateModified={dateModified}
        authorName={authorName}
        publisherName={publisherName}
        publisherLogo={publisherLogo}
        description={description}
      />

      <Container mt={10}>
        <PostTitle fontFamily="inherit" fontWeight="800" textAlign="center">
          {title}
        </PostTitle>
        {/*<Flex*/}
        {/*  mb={5}*/}
        {/*  alignItems="center"*/}
        {/*  fontSize="sm"*/}
        {/*  textAlign="center"*/}
        {/*  justifyContent="center"*/}
        {/*>*/}
        {/*  <DateFormatter dateString={datePublished} />*/}
        {/*</Flex>*/}

        <Heading as="h2" fontSize="md" mb={5}>
          {description}
        </Heading>

        <Box my={5}>
          <Heading as="h3" size="md" mb={2}>
            <Box as="a" href="https://jsonserve.com/" color="green.500">
              <em>JSONSERVE</em>
            </Box>{' '}
          </Heading>

          <Text>
            A simple service that allows you to host your JSON data and consume
            in your app.
          </Text>
          <Text>
            Just paste a JSON object in the textarea, submit and you will get an
            URL.
          </Text>
        </Box>

        <Divider />

        <Box my={5}>
          <Heading as="h3" size="md" mb={2}>
            <Box as="a" href="https://quizio.io/" color="green.500">
              <em>Quizio</em>
            </Box>
          </Heading>

          <Text>Test your code skills and improve your knowledge.</Text>
          <Text>
            A website with code quizzes. For now there is a{' '}
            <Box as="a" href="https://quizio.io/js-quiz/" color="green.500">
              <em>JavaScript Quiz</em>
            </Box>{' '}
            only.
          </Text>
          <Text> Working on other languages and frameworks too.</Text>
        </Box>

        <Divider />

        <Box my={5}>
          <Heading as="h3" size="md" mb={2}>
            <Box
              as="a"
              href="https://game-of-life-app.netlify.app/"
              color="green.500"
            >
              <em>Game of life with React and Typescript</em>
            </Box>
          </Heading>

          <Text mb={5}>
            A classic automation game built with React, hooks, Chakra-UI and
            typescript.
          </Text>
          <Text>A blog post about the game of life:</Text>
          <Box
            as="a"
            href="https://creotip.io/posts/building-game-of-life-with-react-hooks-chakra-ui"
            color="green.500"
          >
            <em>Building Game of Life with React, Hooks and Chakra-UI</em>
          </Box>

          <Text mt={2}>Check the repository here:</Text>
          <Box
            as="a"
            href="https://github.com/creotip/game-of-life-react"
            color="green.500"
          >
            <em> https://github.com/creotip/game-of-life-react</em>
          </Box>
        </Box>

        <Divider />

        <Box my={5}>
          <Heading as="h3" size="md" mb={2}>
            <Box
              as="a"
              href="https://recoil-gear.netlify.app/"
              color="green.500"
            >
              <em>Recoil-gear</em>
            </Box>
          </Heading>

          <Text mb={5}>
            A simple component that connects Redux devtools with Recoil
          </Text>

          <Text>A blog post about recoil-gear:</Text>
          <Box
            as="a"
            href="https://creotip.io/posts/recoil-gear-missing-devtools-for-recoil"
            color="green.500"
          >
            <em>recoil-gear: The missing devtools for recoil.js</em>
          </Box>

          <Text mt={2}>Check the repository here:</Text>
          <Box
            as="a"
            href="https://github.com/creotip/recoil-gear"
            color="green.500"
          >
            <em>https://github.com/creotip/recoil-gear</em>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default Projects
