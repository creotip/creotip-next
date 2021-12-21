import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from 'components/container'
import PostBody from 'components/post-body'
import PostHeader from 'components/post-header'
import Layout from 'components/layout'
import { getPostBySlug, getAllPosts } from 'lib/api'
import PostTitle from 'components/post-title'
import type { PostType } from 'types/post'
import SEO from 'components/seo'
import siteConfig from 'configs/site-config'
import Head from 'next/head'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Giscus } from '@giscus/react'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter()
  const mode = useColorModeValue('light', 'dark')

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <Box
              as="article"
              mb="2rem"
              itemScope
              itemType="http://schema.org/Article"
            >
              <SEO
                title={post.title}
                description={post.excerpt || siteConfig.seo.description}
              />
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </Box>

            <Giscus
              repo="creotip/creotip-next"
              repoId="R_kgDOGgDw8A"
              category="Announcements"
              categoryId="DIC_kwDOGgDw8M4CAXd7"
              mapping="pathname"
              reactionsEnabled="1"
              emitMetadata="0"
              theme={mode === 'light' ? 'light' : 'dark'}
            />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'excerpt',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])

  return {
    props: {
      post: {
        ...post,
        content: post.content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
