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
      <Flex mx={2}>
        By{' '}
        <Box as="address" className="author" ml={2}>
          Ruslan Elishaev
        </Box>
        ,
      </Flex>
    </Flex>
  )
}

export default Avatar
