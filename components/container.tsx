import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

type Props = {
  children?: ReactNode
}

const Container = ({ children }: Props) => {
  return (
    <Box maxW="600px" mx="auto">
      {children}
    </Box>
  )
}

export default Container
