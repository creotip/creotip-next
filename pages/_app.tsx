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
import { ackeeConfig } from 'configs/ackee-config'
import useAckee from 'use-ackee'
import { route } from 'next/dist/server/router'
import { useEffect, useMemo } from 'react'
import * as ackeeTracker from 'ackee-tracker'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()
const { server, options, domainId } = ackeeConfig
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const seo = getSeo()
  const mode = useColorModeValue('light', 'dark')
  const router = useRouter()

  let instance: any = null

  instance = useMemo(() => {
    if (typeof window !== 'undefined') {
      return ackeeTracker.create(server, options)
    }
  }, [])

  const handleRouteChange = (pathname: string) => {
    const attributes = ackeeTracker.attributes(options.detailed)
    const url = new URL(pathname, location as any)

    instance.record(domainId, {
      ...attributes,
      siteLocation: url.href,
    })
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', () => instance.stop())
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
