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
import { Box, Divider, useColorModeValue } from '@chakra-ui/react'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import imageMetadata from 'lib/image-metadata'
import rehypeHighlight from 'rehype-highlight'
import { getPlaiceholder } from 'plaiceholder'
import RecommendedPosts from 'components/recommended-posts'
import { shuffle } from 'lib/shuffle'
import { ArticleJsonLd } from 'next-seo'
import { replaceWhitespace } from 'lib/utils'
import { useInViewRef } from 'lib/use-in-view'
// import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { getSeo } from 'lib/getSeo'
import { Giscus } from '@giscus/react'
import Script from 'next/script'

// const DynamicGiscus: any = dynamic(() =>
//   import('@giscus/react').then((mod: any) => mod.Giscus)
// )

type Props = {
  post: Post
  base64: string
  postsToRead: Post[]
  preview?: boolean
  content: MDXRemoteSerializeResult
}

const Post = ({ post, postsToRead, preview, base64 }: Props) => {
  const router = useRouter()
  const seo = getSeo()
  const mode = useColorModeValue('light', 'dark')
  const [showGiscus, setGiscus] = useState(false)
  const [myRef, inView] = useInViewRef()

  useEffect(() => {
    if (inView && !showGiscus) {
      setGiscus(true)
    }
  }, [inView, showGiscus])

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const postURL = `${siteConfig.seo.siteUrl}/posts/${post.slug}`
  return (
    <Layout preview={preview}>
      <SEO
        {...seo}
        title={post.title}
        description={post.excerpt || siteConfig.seo.description}
        canonical={postURL}
        openGraph={{
          type: 'article',
          url: postURL,
          title: `${post.title}`,
          description: post.description,
          images: [
            {
              url: replaceWhitespace(
                `https://og-image-creotip.vercel.app/${post.title}.png?theme=dark`
              ),
              width: 800,
              height: 600,
              alt: post.title,
              type: 'image/png',
            },
          ],
          site_name: 'creotip.io',
        }}
      />
      <ArticleJsonLd
        url={postURL}
        title={post.title}
        images={[siteConfig.seo.siteUrl + post.coverImage]}
        datePublished={post.date}
        dateModified={post.date}
        authorName={post.author.name}
        publisherName="creotip.io"
        publisherLogo={`${siteConfig.seo.siteUrl}/logo.png`}
        description={post.excerpt}
      />
      <Container mt={10}>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <Box as="article" mb="2rem">
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

            {/*<Divider my={10} />*/}

            {/*<Box ref={myRef}>*/}
            {/*  {showGiscus && (*/}
            {/*    <Giscus*/}
            {/*      repo="creotip/creotip-next"*/}
            {/*      repoId="R_kgDOGgDw8A"*/}
            {/*      category="Announcements"*/}
            {/*      categoryId="DIC_kwDOGgDw8M4CAXd7"*/}
            {/*      mapping="pathname"*/}
            {/*      reactionsEnabled="1"*/}
            {/*      emitMetadata="0"*/}
            {/*      theme={mode === 'light' ? 'light' : 'dark'}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*</Box>*/}
            {/*<Giscus*/}
            {/*  repo="creotip/creotip-next"*/}
            {/*  repoId="R_kgDOGgDw8A"*/}
            {/*  category="Announcements"*/}
            {/*  categoryId="DIC_kwDOGgDw8M4CAXd7"*/}
            {/*  mapping="title"*/}
            {/*  reactionsEnabled="1"*/}
            {/*  emitMetadata="0"*/}
            {/*  lang="en"*/}
            {/*  theme={mode === 'light' ? 'light' : 'dark'}*/}
            {/*/>*/}
            {/*<Box className="giscus" />*/}

            {/*<Script*/}
            {/*  src="https://giscus.app/client.js"*/}
            {/*  data-repo="creotip/creotip-next"*/}
            {/*  data-repo-id="R_kgDOGgDw8A"*/}
            {/*  data-category="Announcements"*/}
            {/*  data-category-id="DIC_kwDOGgDw8M4CAXd7"*/}
            {/*  data-mapping="url"*/}
            {/*  data-reactions-enabled="1"*/}
            {/*  data-emit-metadata="0"*/}
            {/*  data-input-position="bottom"*/}
            {/*  data-theme="light"*/}
            {/*  data-lang="en"*/}
            {/*  crossOrigin="anonymous"*/}
            {/*  async*/}
            {/*/>*/}
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
            rehypePlugins: [imageMetadata, rehypeHighlight as any],
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
