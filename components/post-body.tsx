import * as React from 'react'
import { chakra, Box, UnorderedList, OrderedList } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import Image from 'next/image'
import 'highlight.js/styles/atom-one-dark.css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <Box className="post-body" itemProp="articleBody">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: (props) => <chakra.h1 apply="mdx.h1" {...props} />,
          h3: (props) => <chakra.h3 apply="mdx.h3" mb={1} {...props} />,
          strong: (props) => (
            <chakra.span as="strong" fontWeight="semibold" {...props} />
          ),
          p: (props: any) =>
            props?.children?.[0]?.props?.src ? (
              <Box mt="1rem" {...props} />
            ) : (
              <chakra.p apply="mdx.p" mt="1rem" {...props} />
            ),
          ul: (props) => (
            <UnorderedList node={props.node}>{props.children}</UnorderedList>
          ),
          ol: (props) => (
            <OrderedList node={props.node}>{props.children}</OrderedList>
          ),
          li: (props) => (
            <chakra.li pb="4px" node={props.node}>
              {props.children}
            </chakra.li>
          ),
          pre: (props) => (
            <chakra.div borderRadius={8} overflow="hidden">
              <chakra.pre {...props} />
            </chakra.div>
          ),
          code: (props) => <chakra.code p={5} {...props} />,
          img: (props: any) => (
            <Box
              position="relative"
              w="100%"
              h="100%"
              boxShadow="2xl"
              rounded="md"
            >
              <Image
                {...props}
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
              />
            </Box>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  )
}

export default PostBody
