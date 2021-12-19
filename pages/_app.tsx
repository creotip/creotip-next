import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { getSeo } from 'lib/getSeo'
import customTheme from 'configs/theme'

function MyApp({ Component, pageProps }: AppProps) {
  const seo = getSeo()
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <meta name="theme-color" content="#319795" />
        <meta
          name="google-site-verification"
          content="ZVD8deiXHUw9PANTqZYO6QMgOVtHKtqpHrU96JGo1zI"
        />
      </Head>
      <DefaultSeo {...seo} />
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
