import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Header from 'components/header'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Flex minHeight="100vh" alignItems="center" flexDir="column">
        <Header />
        <Box
          as="main"
          display="flex"
          flexDirection="column"
          maxW="100%"
          width="100%"
        >
          {children}
        </Box>
        <Box as="footer" p={5} mt={8}>
          <a href="https://creotip.io/">Powered by creotip</a>
        </Box>
      </Flex>
    </>
  )
}

export default Layout
