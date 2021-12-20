import * as React from 'react'
import { chakra, Box } from '@chakra-ui/react'
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
          p: (props) => <chakra.p apply="mdx.p" mt="1rem" {...props} />,
          ul: (props) => <chakra.ul apply="mdx.ul" {...props} />,
          ol: (props) => <chakra.ol apply="mdx.ul" {...props} />,
          li: (props) => <chakra.li pb="4px" {...props} />,
          pre: (props) => (
            <chakra.div borderRadius={8} overflow="hidden">
              <chakra.pre {...props} />
            </chakra.div>
          ),
          code: (props) => <chakra.code p={5} {...props} />,
          img: (props: any) => (
            <chakra.div
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
            </chakra.div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  )
}

export default PostBody
