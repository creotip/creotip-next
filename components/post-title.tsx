import { ReactNode } from 'react'
import { Heading } from '@chakra-ui/react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <Heading
      as="h1"
      itemProp="headline"
      mb="1rem"
      fontSize="2.7rem"
      fontWeight="300"
    >
      {children}
    </Heading>
  )
}

export default PostTitle
