/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Layout from 'components/layout'
import { getSeo } from 'lib/getSeo'
import SEO from 'components/seo'
import { replaceWhitespace } from 'lib/utils'
import PostTitle from 'components/post-title'
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import DateFormatter from 'components/date-formatter'
import Head from 'next/head'
import Container from 'components/container'
import Href from 'components/Href'
import { ArticleJsonLd } from 'next-seo'
import BookmarkCard from 'components/bookmark-card'
import { favoriteWebsites } from 'configs/favorite-websites'
import siteConfig from 'configs/site-config'

const pageConfig = {
  title: 'Favorites',
  description: 'A collection of tools and websites that i use constantly',
}

const FavoriteTools = () => {
  const seo = getSeo()
  return (
    <Layout>
      <SEO
        {...seo}
        twitter={{
          handle: '@handle',
          site: '@creotip',
          cardType: 'summary_large_image',
        }}
        openGraph={{
          url: '/favorite-tools',
          title: pageConfig.title,
          description: pageConfig.description,
          images: [
            {
              url: replaceWhitespace(
                `https://og-image-creotip.vercel.app/Favorite%20Tools.png?theme=dark`
              ),
              width: 800,
              height: 600,
              alt: pageConfig.title,
              type: 'image/png',
            },
          ],
          site_name: 'creotip.io',
        }}
        title={pageConfig.title}
        description={pageConfig.description}
      />
      <ArticleJsonLd
        url="/favorite-tools"
        title={pageConfig.title}
        images={[
          replaceWhitespace(
            `https://og-image-creotip.vercel.app/Favorite%20Tools.png?theme=dark`
          ),
        ]}
        datePublished="2022-01-24T14:13:16.694Z"
        dateModified="2022-01-24T14:13:16.694Z"
        authorName={'Ruslan Elishaev'}
        publisherName="creotip.io"
        publisherLogo={`${siteConfig.seo.siteUrl}/logo.png`}
        description={pageConfig.description}
      />

      <Container mt={10}>
        <PostTitle fontFamily="inherit" fontWeight="800" textAlign="center">
          Favorite Tools
        </PostTitle>

        <Text mb={5}>
          A collection of tools and websites that i use constantly
        </Text>

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          gap={12}
          alignItems="stretch"
          w="full"
          as="section"
        >
          {favoriteWebsites.map((item, index) => (
            <BookmarkCard
              key={index}
              title={item.title}
              link={item.link}
              cover={item.cover}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default FavoriteTools
