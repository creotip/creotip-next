import Link from 'next/link'
import { Box, Grid, SimpleGrid } from '@chakra-ui/react'

const Header = () => {
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
        >
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </Grid>
      </Box>
    </Box>
  )
}

export default Header
