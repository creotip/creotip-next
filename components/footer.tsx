import React from 'react'
import { Box, Divider, Stack, VStack, Link, Text } from '@chakra-ui/react'
import Container from 'components/container'
import { useRouter } from 'next/router'
import {
  GITHUB_PROFILE,
  LINKEDIN_PROFILE,
  POLYWORK_PROFILE,
} from 'configs/constants'
import NextLink from 'next/link'

const firstGroup = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/projects',
    label: 'My Projects',
  },
  {
    href: '/favorite-tools',
    label: 'Favorite Tools',
  },
]

const secondGroup = [
  {
    href: GITHUB_PROFILE,
    label: 'GitHub',
  },
  {
    href: LINKEDIN_PROFILE,
    label: 'LinkedIn',
  },
  {
    href: POLYWORK_PROFILE,
    label: 'Polywork',
  },
]

const thirdGroup: any[] = [
  // {
  //   href: '/uses',
  //   label: 'Uses',
  // },
  // {
  //   href: '/gear',
  //   label: 'Gear',
  // },
  // {
  //   href: '/bookmarks',
  //   label: 'Bookmarks',
  // },
  // {
  //   href: '/books',
  //   label: 'Books',
  // },
  // {
  //   href: '/newsletter',
  //   label: 'Newsletter',
  // },
]

const Footer = () => {
  const { pathname } = useRouter()

  return (
    <Box as="footer" p={5} mt={8} w="100%">
      <Container>
        <Divider my={5} />
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          w="full"
          spacing={{ base: 2, md: 8 }}
        >
          <VStack alignItems="flex-start">
            {firstGroup.map(({ href, label }) => (
              <NextLink key={href} href={href} passHref>
                <Link
                  isExternal={href.startsWith('http')}
                  color={pathname === href ? 'green.500' : 'gray.500'}
                >
                  {label}
                </Link>
              </NextLink>
            ))}
          </VStack>
          <VStack alignItems="flex-start">
            {secondGroup.map(({ href, label }) => (
              <NextLink key={href} href={href} passHref>
                <Link
                  isExternal={href.startsWith('http')}
                  target="_blank"
                  color="gray.500"
                >
                  {label}
                </Link>
              </NextLink>
            ))}
          </VStack>
          <VStack alignItems="flex-start">
            {thirdGroup.map(({ href, label }) => (
              <NextLink key={href} href={href} passHref>
                <Link
                  isExternal={href.startsWith('http')}
                  color={pathname === href ? 'green.500' : 'gray.500'}
                >
                  {label}
                </Link>
              </NextLink>
            ))}
          </VStack>
        </Stack>
        <Box textAlign="center" my={8}>
          <Box color="gray.500">
            ©<Box as="time">{new Date().getFullYear()}</Box> creotip.io
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
