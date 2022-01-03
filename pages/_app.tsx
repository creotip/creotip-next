import {
  Box,
  ChakraProvider,
  useColorModeValue,
  ScaleFade,
} from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import customTheme from 'configs/theme'

interface MyAppProps extends AppProps {}

function MyApp({ Component, pageProps, router }: MyAppProps) {
  const mode = useColorModeValue('light', 'dark')

  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" sizes="96x96" href="/logo.png" />
        <meta
          name="google-site-verification"
          content="aTbQBMj8oiDmPHyuWHqMoxuv3NGKzHWCLV3rzlIJawo"
        />
        <Box
          as="meta"
          name="theme-color"
          content={mode === 'light' ? 'white' : '#141922'}
        />
      </Head>

      <ScaleFade key={router.route} initialScale={0.9} in={true}>
        <Component {...pageProps} />
      </ScaleFade>
    </ChakraProvider>
  )
}

export default MyApp
