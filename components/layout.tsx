import { Box, Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import Header from 'components/header'
import Footer from 'components/footer'

type Props = {
  preview?: boolean
  children: ReactNode
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
        <Footer />
      </Flex>
    </>
  )
}

export default Layout
