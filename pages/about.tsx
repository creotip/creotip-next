/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Layout from 'components/layout'
import { getSeo } from 'lib/getSeo'
import SEO from 'components/seo'
import { replaceWhitespace } from 'lib/utils'
import PostTitle from 'components/post-title'
import { Box, Flex, Text } from '@chakra-ui/react'
import DateFormatter from 'components/date-formatter'
import Container from 'components/container'
import Href from 'components/Href'
import { ArticleJsonLd } from 'next-seo'
import siteConfig from 'configs/site-config'

const About = () => {
  const seo = getSeo()

  const postURL = `${siteConfig.seo.siteUrl}/about`
  return (
    <Layout>
      <SEO
        {...seo}
        title="About Me"
        description="My name is Ruslan Elishaev. Fullstack developer, father and husband. I'm passionate about technology, history and politics."
        canonical={postURL}
        openGraph={{
          url: postURL,
          title: `About me`,
          description: `My name is Ruslan Elishaev. Fullstack developer, father and husband. I'm passionate about technology, history and politics.`,
          images: [
            {
              url: replaceWhitespace(
                `https://og-image-creotip.vercel.app/About%20me.png?theme=dark`
              ),
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
        images={[
          replaceWhitespace(
            `https://og-image-creotip.vercel.app/About%20me.png?theme=dark`
          ),
        ]}
        datePublished="2022-01-24T14:13:16.694Z"
        dateModified="2022-01-24T14:13:16.694Z"
        authorName="Ruslan Elishaev"
        publisherName="creotip.io"
        publisherLogo={`${siteConfig.seo.siteUrl}/logo.png`}
        description="My name is Ruslan Elishaev. Fullstack developer, father and husband. I'm passionate about technology, history and politics."
      />

      <Container mt={10}>
        <PostTitle fontFamily="inherit" fontWeight="800" textAlign="center">
          About Me
        </PostTitle>
        <Flex
          mb={5}
          alignItems="center"
          fontSize="sm"
          textAlign="center"
          justifyContent="center"
        >
          <DateFormatter dateString={'2022-01-24T14:13:16.694Z'} />
        </Flex>

        <Text>
          Hello, my name is Ruslan, and I have been a full-stack developer for
          almost 10 years. Over the years, I have developed a deep understanding
          of frontend and backend technologies. My passion for technology has
          driven me to learn and explore the latest developments in the field.
        </Text>

        <Text mb={5}>
          I'm thrilled to share my knowledge and experience with you through
          this blog. My goal is to help you stay updated on the latest
          advancements in the full-stack world, aand as the technology landscape
          continues to evolve, I understand the importance of keeping your
          skills relevant and up-to-date.
        </Text>

        <Text mb={5}>
          As I navigate through the vast amount of information available, I am
          continually learning and expanding my knowledge base. My enthusiasm
          for the field inspires me to share my insights, tips, and tutorials
          with others.
        </Text>

        <Text mb={5}>
          While my writing skills may be limited, I will do my best to provide
          you with clear and informative step-by-step guides. My blog is not
          just another "how-to" resource. I strive to offer unique perspectives
          and valuable insights that you won't find elsewhere.
        </Text>
        <Text mb={5}>
          Thank you for joining me on this journey. I look forward to sharing my
          knowledge and insights with you.
        </Text>
      </Container>
    </Layout>
  )
}

export default About
