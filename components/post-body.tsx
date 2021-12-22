import {
  chakra,
  Box,
  UnorderedList,
  OrderedList,
  Alert,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import Image from 'next/image'
import 'highlight.js/styles/atom-one-dark.css'
import { forwardRef } from 'react'

type Props = {
  content: string
}

// eslint-disable-next-line react/display-name
export const Anchor = forwardRef((props: any, ref: any) => (
  <chakra.a ref={ref} apply="mdx.a" {...props} />
))

const PostBody = ({ content }: Props) => {
  return (
    <Box className="post-body" itemProp="articleBody">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: (props) => <chakra.h1 apply="mdx.h1" {...props} />,
          h2: (props) => <chakra.h2 apply="mdx.h3" mb={1} {...props} />,
          h3: (props) => <chakra.h3 apply="mdx.h3" mb={1} {...props} />,
          hr: (props) => <chakra.hr apply="mdx.hr" {...props} />,
          strong: (props) => (
            <chakra.span as="strong" fontWeight="semibold" {...props} />
          ),
          a: (props: any) => (
            <chakra.a apply="mdx.a" color="green.500" {...props} />
          ),
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
          ul: (props) => (
            <UnorderedList node={props.node} mt="1.5rem" ml="1.25rem">
              {props.children}
            </UnorderedList>
          ),
          ol: (props) => (
            <OrderedList node={props.node} mt="1.5rem" ml="1.25rem">
              {props.children}
            </OrderedList>
          ),
          li: (props) => (
            <chakra.li pb={3} node={props.node}>
              {props.children}
            </chakra.li>
          ),
          pre: (props) => (
            <chakra.div borderRadius={8} overflow="hidden">
              <chakra.pre {...props} />
            </chakra.div>
          ),
          code: (props) => <chakra.code p={5} {...props} />,
          img: (props: any) => {
            return (
              <Box
                position="relative"
                w="100%"
                h="100%"
                boxShadow="2xl"
                rounded="md"
              >
                <Image
                  {...props}
                  width={700}
                  height={500}
                  layout="responsive"
                  objectFit="contain"
                />
              </Box>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  )
}

export default PostBody
