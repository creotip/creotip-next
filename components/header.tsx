import Link from 'next/link'
import {
  Box,
  Grid,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaMoon, FaSun, FaYoutube } from 'react-icons/fa'
import { Logo } from 'components/logo'

const Header = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const mode = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="12"
      bgColor={mode === 'dark' ? 'white' : '#141922'}
      borderBottom="1px solid #80808033"
      w="100%"
      mb="3rem"
    >
      <Box
        as="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        h="60px"
        maxWidth="750px"
        mx="auto"
        px={2}
      >
        <Box fontWeight="800" letterSpacing="2px">
          <Link href="/">
            <a className="hover:underline">
              <Logo mode={mode} />
            </a>
          </Link>
        </Box>

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
