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
import { FaMoon, FaSun } from 'react-icons/fa'
import { Logo } from 'components/logo'
import { useRouter } from 'next/router'

const Header = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const mode = useColorModeValue('light', 'dark')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const router = useRouter()

  return (
    <Box
      as="header"
      bgColor={mode === 'light' ? 'white' : 'gray.800'}
      w="100%"
      py={2}
      bg={
        router.pathname === '/'
          ? mode === 'light'
            ? 'linear-gradient(to right, rgb(227 234 241), #fafbfd)'
            : 'linear-gradient(to right, rgb(26 32 43), #455062)'
          : 'none'
      }
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="750px"
        mx="auto"
        px={3}
      >
        <Flex fontWeight="700" maxWidth="70px">
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
            {/*<li>About</li>*/}
            {/*<li>Contact</li>*/}
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
