import { Box, ChakraProvider, useColorModeValue } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { getSeo } from 'lib/getSeo'
import customTheme from 'configs/theme'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from 'lib/createEmotionCache'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useAckee from 'use-ackee'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const seo = getSeo()
  const mode = useColorModeValue('light', 'dark')
  const router = useRouter()

  const handleRouteChange = (url: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAckee(
      url,
      {
        server: 'https://ackee-creotip.vercel.app/',
        domainId: 'ea31e3cd-6c5a-48a4-b290-99b4f734950e',
      },
      {
        detailed: false,
        ignoreLocalhost: true,
        ignoreOwnVisits: true,
      }
    )
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
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
        <DefaultSeo {...seo} />

        <Component {...pageProps} />
      </ChakraProvider>
    </CacheProvider>
  )
}

export default MyApp
