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
  ModalCloseButton,
} from '@chakra-ui/react'
import Image from 'next/image'

import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { InlineCode } from 'components/inline-code'

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
      <Image {...props} loading="lazy" quality={100} />
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
