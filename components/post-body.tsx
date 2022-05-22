import {
  chakra,
  Box,
  UnorderedList,
  OrderedList,
  Alert,
  Kbd,
} from '@chakra-ui/react'
import Image from 'next/image'
import 'highlight.js/styles/atom-one-dark.css'
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { InlineCode } from 'components/inline-code'

type Props = {
  content: MDXRemoteSerializeResult
}

const MDXComponents = {
  h1: (props: any) => <chakra.h1 apply="mdx.h1" {...props} />,
  h2: (props: any) => <chakra.h2 apply="mdx.h2" {...props} />,
  h3: (props: any) => <chakra.h3 apply="mdx.h3" {...props} />,
  hr: (props: any) => <chakra.hr apply="mdx.hr" {...props} />,
  strong: (props: any) => (
    <chakra.span as="strong" fontWeight="bold" {...props} />
  ),
  a: (props: any) => <chakra.a apply="mdx.a" color="green.500" {...props} />,
  kbd: Kbd,
  blockquote: (props: any) => (
    <Alert
      mt="4"
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      my="1.5rem"
      {...props}
    />
  ),
  p: (props: any) =>
    props?.children?.[0]?.props?.src ? (
      <Box mt="1rem" {...props} />
    ) : (
      <chakra.p apply="mdx.p" mt="1rem" {...props} />
    ),
  ul: (props: any) => (
    <UnorderedList mt="1.5rem" ml="1.25rem">
      {props.children}
    </UnorderedList>
  ),
  ol: (props: any) => (
    <OrderedList mt="1.5rem" ml="1.25rem">
      {props.children}
    </OrderedList>
  ),
  li: (props: any) => <chakra.li pb={3}>{props.children}</chakra.li>,
  pre: (props: any) => {
    if (typeof props.children === 'string')
      return <chakra.div my="2em" borderRadius="sm" {...props} />
    return <chakra.pre {...props} />
  },
  code: InlineCode,
  img: (props: any) => {
    return (
      <Box position="relative" w="100%" h="100%" boxShadow="2xl" rounded="md">
        <Image {...props} layout="responsive" loading="lazy" quality={100} />
      </Box>
    )
  },
}

const PostBody = ({ content }: Props) => {
  return (
    <Box className="post-body">
      <MDXRemote {...content} components={MDXComponents} />
    </Box>
  )
}

export default PostBody
