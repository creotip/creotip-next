import Link from 'next/link'
import { HTMLMotionProps, motion } from 'framer-motion'
import {
  Box,
  chakra,
  Flex,
  Grid,
  HTMLChakraProps,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Logo } from 'components/logo'
import { useRouter } from 'next/router'
import React from 'react'

type Merge<P, T> = Omit<P, keyof T> & T
type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>
export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div)

const Header = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const mode = useColorModeValue('light', 'dark')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const router = useRouter()

  console.log('rendered')
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
        <Flex fontWeight="800">
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
