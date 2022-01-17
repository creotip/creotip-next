import type { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

interface Props {
  children: ReactNode | ReactNode[]
  url: string
}
const Href = ({ children, url }: Props) => {
  return (
    <Box as="a" href={url} color="green.500">
      <em>
        <strong>{children}</strong>
      </em>
    </Box>
  )
}

export default Href
