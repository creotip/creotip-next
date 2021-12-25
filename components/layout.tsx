import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Header from 'components/header'
// import Meta from './meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Flex minHeight="100vh" alignItems="center" flexDir="column">
        <Header />
        {children}
        <Box as="footer" p={5} mt={8}>
          <a href="https://creotip.io/">Powered by creotip</a>
        </Box>
      </Flex>
    </>
  )
}

export default Layout
