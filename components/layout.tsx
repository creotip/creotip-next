import { Flex } from '@chakra-ui/react'
import React from 'react'
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
        {children}
      </Flex>
    </>
  )
}

export default Layout
