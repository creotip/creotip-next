import { Box, chakra, Code, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

export const InlineCode = (props: any) => (
  <Code
    className="chakra-code"
    apply="mdx.code"
    // color={useColorModeValue('purple.500', 'purple.200')}    // color={useColorModeValue('purple.500', 'purple.200')}
    {...props}
  />
)
