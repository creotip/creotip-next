import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from 'components/container'
import PostBody from 'components/post-body'
import PostHeader from 'components/post-header'
import Layout from 'components/layout'
import { getPostBySlug, getAllPosts } from 'lib/api'
import PostTitle from 'components/post-title'
import type { Post } from 'types/post'
import SEO from 'components/seo'
import siteConfig from 'configs/site-config'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Giscus } from '@giscus/react'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import imageMetadata from 'lib/image-metadata'
import rehypeHighlight from 'rehype-highlight'
import { getPlaiceholder } from 'plaiceholder'
import RecommendedPosts from 'components/recommended-posts'
import { shuffle } from 'lib/shuffle'
import { ArticleJsonLd } from 'next-seo'

type Props = {
  post: Post
  base64: string
  postsToRead: Post[]
  preview?: boolean
  content: MDXRemoteSerializeResult
}

const Post = ({ post, postsToRead, preview, base64 }: Props) => {
  const router = useRouter()
  const mode = useColorModeValue('light', 'dark')

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <ArticleJsonLd
        url={`${siteConfig.seo.siteUrl}/posts/${post.slug}`}
        title={post.title}
        images={[siteConfig.seo.siteUrl + post.coverImage]}
        datePublished={post.date}
        dateModified={post.date}
        authorName={post.author.name}
        publisherName={post.author.name}
        publisherLogo={siteConfig.seo.siteUrl + post.author.picture}
        description={post.excerpt}
      />
      <Container mt={10}>
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
                base64={base64}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </Box>

            <RecommendedPosts postsToRead={postsToRead} />

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
    'tags',
  ])

  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags',
  ])

  let randomPosts = shuffle(allPosts).filter((item) => item.slug !== post.slug)
  let postsToRead = [randomPosts[0], randomPosts[1]]

  const { css, img, base64, blurhash } = await getPlaiceholder(post.coverImage)

  return {
    props: {
      base64,
      postsToRead,
      post: {
        ...post,
        content: await serialize(post.content, {
          mdxOptions: {
            rehypePlugins: [imageMetadata, rehypeHighlight],
          },
        }),
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
