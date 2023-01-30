import {
  chakra,
  Box,
  UnorderedList,
  OrderedList,
  Alert,
  Kbd,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Image as ChakraImage,
  ModalCloseButton,
  HTMLChakraProps,
} from '@chakra-ui/react'
import Image from 'next/image'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { InlineCode } from 'components/inline-code'
import { Children, forwardRef, ReactNode } from 'react'
import { convert } from 'html-to-text'
import ReactDOMServer from 'react-dom/server'

type Props = {
  content: MDXRemoteSerializeResult
}

const PostInnerImage = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      onClick={onOpen}
      className="post-image"
      position="relative"
      w="100%"
      h="100%"
      boxShadow="2xl"
      rounded="md"
      cursor="zoom-in"
    >
      <Image {...props} layout="responsive" loading="lazy" quality={100} />
      <Modal onClose={onClose} size="5xl" isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent alignItems="center" justifyContent="center">
          <ModalCloseButton />
          <img {...props} />
        </ModalContent>
      </Modal>
    </Box>
  )
}

// eslint-disable-next-line react/display-name
export const Anchor = forwardRef((props: any, ref: any) => (
  <chakra.a ref={ref} apply="mdx.a" {...props} />
))

export function getAnchor(text: any) {
  const html = ReactDOMServer.renderToStaticMarkup(text)
  const rex = convert(html)
  if (rex) {
    return rex
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/[ ]/g, '-')
  }
}

export const LinkedHeading = (props: HTMLChakraProps<'h2'>) => {
  const anchor = getAnchor(props.children)
  const link = `#${anchor}`
  return (
    <chakra.h2
      data-group=""
      id={anchor}
      css={{ scrollMarginBlock: '6.875rem' }}
      {...props}
    >
      <span className="content">{props.children}</span>
      <chakra.a
        aria-label="anchor"
        color="teal.500"
        fontWeight="normal"
        outline="none"
        _focus={{ opacity: 1, boxShadow: 'outline' }}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        ml="0.375rem"
        href={link}
      >
        #
      </chakra.a>
    </chakra.h2>
  )
}

const MDXComponents = {
  h1: (props: any) => <chakra.h1 apply="mdx.h1" {...props} />,
  h2: (props: any) => <LinkedHeading apply="mdx.h2" {...props} />,
  h3: (props: any) => <LinkedHeading as="h3" apply="mdx.h3" {...props} />,
  h4: (props: any) => <LinkedHeading as="h4" apply="mdx.h4" {...props} />,
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
      return (
        <chakra.div
          className="chakra-pre-div"
          my="2em"
          borderRadius="sm"
          {...props}
        />
      )
    return <chakra.pre className="chakra-pre" {...props} />
  },
  code: (props: any) => {
    return <chakra.code apply="mdx.code" className="chakra-code" {...props} />
  },
  img: (props: any) => {
    return <PostInnerImage {...props} />
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
