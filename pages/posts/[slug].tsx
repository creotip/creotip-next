import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from 'components/container'
import PostBody from 'components/post-body'
import Header from '../../components/header'
import PostHeader from 'components/post-header'
import Layout from 'components/layout'
import { getPostBySlug, getAllPosts } from 'lib/api'
import PostTitle from 'components/post-title'
import Head from 'next/head'
import { CMS_NAME } from 'lib/constants'
import markdownToHtml from 'lib/markdownToHtml'
import type { PostType } from 'types/post'
import SEO from 'components/seo'
import siteConfig from 'configs/site-config'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter()
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
            <article className="mb-32">
              <SEO
                title={post.title}
                description={post.excerpt || siteConfig.seo.description}
              />
              {/*<Head>*/}
              {/*  <title>{post.title} | creotip blog</title>*/}
              {/*  <meta property="og:image" content={post.ogImage.url} />*/}
              {/*  <meta name="description" content={post.excerpt} />*/}
              {/*</Head>*/}
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
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
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
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
