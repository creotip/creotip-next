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
      fontSize={['1.75rem', '2rem', '2.5rem']}
      fontWeight="400"
      fontFamily="'Playfair Display', serif"
    >
      {children}
    </Heading>
  )
}

export default PostTitle
