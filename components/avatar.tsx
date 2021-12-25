import Image, { ImageProps } from 'next/image'
import { Box, Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'

type Props = {
  name: string
  picture: string
}

const Img = styled(Image)`
  border-radius: 50%;
`

const Avatar = ({ name, picture }: Props) => {
  return (
    <Flex alignItems="center">
      <Box>
        <Img src={picture} alt={name} width="30px" height="30px" />
      </Box>
      <Box mx={2} itemProp="author">
        By {name},
      </Box>
    </Flex>
  )
}

export default Avatar
