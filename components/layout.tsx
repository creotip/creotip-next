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
      {/*<Meta />*/}
      <Flex minHeight="100vh" alignItems="center" flexDir="column">
        <Header />
        {children}

        <Box as="footer" p={5} mt={8}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by creotip{/*<span>*/}
            {/*  <Image*/}
            {/*    src="/vercel.svg"*/}
            {/*    alt="Vercel Logo"*/}
            {/*    layout="fixed"*/}
            {/*    width={72}*/}
            {/*    height={16}*/}
            {/*  />*/}
            {/*</span>*/}
          </a>
        </Box>
      </Flex>
    </>
  )
}

export default Layout
