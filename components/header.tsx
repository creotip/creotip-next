import Link from 'next/link'
import {
  Box,
  Grid,
  IconButton,
  SimpleGrid,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaMoon, FaSun, FaYoutube } from 'react-icons/fa'

const Header = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  console.log(text)
  return (
    <Box
      position="sticky"
      top="0"
      zIndex="12"
      bgColor={text === 'dark' ? 'white' : '#141922'}
      borderBottom="2px dotted"
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
      >
        <Box fontWeight="800" letterSpacing="2px">
          <Link href="/">
            <a className="hover:underline">CREOTIP</a>
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
            <li>Goodies</li>
            <Box>
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
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
