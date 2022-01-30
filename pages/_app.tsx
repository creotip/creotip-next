import { Box, ChakraProvider, useColorModeValue } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import customTheme from 'configs/theme'
import Script from 'next/script'

interface MyAppProps extends AppProps {}

function MyApp({ Component, pageProps }: MyAppProps) {
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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RK486MRH74"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-RK486MRH74');
        `}
        </Script>
      </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
