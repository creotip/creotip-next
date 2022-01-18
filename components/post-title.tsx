import { ReactNode } from 'react'
import { BoxProps, Heading } from '@chakra-ui/react'

interface Props extends BoxProps {
  children?: ReactNode
}

const PostTitle = ({ children, ...props }: Props) => {
  return (
    <Heading
      as="h1"
      mb="1rem"
      fontSize={['1.75rem', '2rem', '2.5rem']}
      fontWeight="400"
      fontFamily="'Playfair Display', serif"
      {...props}
    >
      {children}
    </Heading>
  )
}

export default PostTitle
