import { ReactNode } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

interface Props extends BoxProps {
  children?: ReactNode
}

const Container = ({ children, ...props }: Props) => {
  return (
    <Box maxW="750px" w="full" mx="auto" px={3} {...props}>
      {children}
    </Box>
  )
}

export default Container
