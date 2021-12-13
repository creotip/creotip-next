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
  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      h="60px"
    >
      <Box>
        <Link href="/">
          <a className="hover:underline">Creotip</a>
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
          <li>one</li>
          <li>two</li>
          <li>three</li>
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
  )
}

export default Header
