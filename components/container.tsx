import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

type Props = {
  children?: ReactNode
}

const Container = ({ children }: Props) => {
  return (
    <Box maxW="750px" w="full" mx="auto" px={3}>
      {children}
    </Box>
  )
}

export default Container
