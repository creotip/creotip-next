import {
  chakra,
  Box,
  UnorderedList,
  OrderedList,
  Alert,
} from '@chakra-ui/react'
import Image from 'next/image'
import 'highlight.js/styles/atom-one-dark.css'
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

type Props = {
  content: MDXRemoteSerializeResult
}

const MDXComponents = {
  h1: (props: any) => <chakra.h1 apply="mdx.h1" {...props} />,
  h2: (props: any) => <chakra.h2 apply="mdx.h3" mb={1} {...props} />,
  h3: (props: any) => <chakra.h3 apply="mdx.h3" mb={1} {...props} />,
  hr: (props: any) => <chakra.hr apply="mdx.hr" {...props} />,
  strong: (props: any) => (
    <chakra.span as="strong" fontWeight="semibold" {...props} />
  ),
  a: (props: any) => <chakra.a apply="mdx.a" color="green.500" {...props} />,
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
    <UnorderedList node={props.node} mt="1.5rem" ml="1.25rem">
      {props.children}
    </UnorderedList>
  ),
  ol: (props: any) => (
    <OrderedList node={props.node} mt="1.5rem" ml="1.25rem">
      {props.children}
    </OrderedList>
  ),
  li: (props: any) => (
    <chakra.li pb={3} node={props.node}>
      {props.children}
    </chakra.li>
  ),
  pre: (props: any) => (
    <chakra.div borderRadius={8} overflow="hidden">
      <chakra.pre {...props} />
    </chakra.div>
  ),
  code: (props: any) => <chakra.code p={5} {...props} />,
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
    <Box className="post-body" itemProp="articleBody">
      <MDXRemote {...content} components={MDXComponents} />
    </Box>
  )
}

export default PostBody
