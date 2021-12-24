import Link from 'next/link'
import Image from 'next/image'

import {
  Box,
  Flex,
  Grid,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaMoon, FaSun, FaYoutube } from 'react-icons/fa'
import { Logo } from 'components/logo'

const Header = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const mode = useColorModeValue('light', 'dark')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <Box
      // position="sticky"
      // top="0"
      // zIndex="12"
      bgColor={mode === 'light' ? 'white' : 'gray.800'}
      // borderBottom="1px solid #80808033"
      w="100%"
      mb="3rem"
      // boxShadow="lg"
      py={2}
    >
      <Box
        as="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        h="60px"
        maxWidth="750px"
        mx="auto"
        px={3}
      >
        <Flex fontWeight="800" py={5}>
          <Link href="/">
            <Box
              as="a"
              display="flex"
              cursor="pointer"
              className="hover:underline"
            >
              <Logo color={mode === 'dark' ? 'white' : '#2d3748'} />
            </Box>
          </Link>
        </Flex>

        <Box as="nav">
          <Grid
            as="ul"
            listStyleType="none"
            display="grid"
            gridGap="10px"
            gridAutoFlow="column"
            alignItems="center"
          >
            <li>About</li>
            <li>Contact</li>
            <Box>
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${mode} mode`}
                variant="ghost"
                color="current"
                ml={{ base: '0', md: '3' }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
