import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import { Box, ChakraProvider, useColorModeValue } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import customTheme from 'configs/theme'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from 'lib/createEmotionCache'
import { useRouter } from 'next/router'
import { ackeeConfig } from 'configs/ackee-config'
import { useEffect, useMemo } from 'react'
import * as ackeeTracker from 'ackee-tracker'
import PlausibleProvider from 'next-plausible'

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
  const mode = useColorModeValue('light', 'dark')
  const router = useRouter()

  let instance: any = useMemo(() => {
    if (typeof window !== 'undefined') {
      return ackeeTracker.create(server, options)
    }
  }, [])

  useEffect(() => {
    const attributes = ackeeTracker.attributes(options.detailed)
    const url = new URL(router.asPath, location as any)

    const { stop } = instance.record(domainId, {
      ...attributes,
      siteLocation: url.href,
    })
    return () => {
      stop()
    }
  }, [router.asPath])

  return (
    <PlausibleProvider domain="https://creotip.io/">
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={customTheme}>
          <Head>
            <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
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

          <Component {...pageProps} />
        </ChakraProvider>
      </CacheProvider>
    </PlausibleProvider>
  )
}

export default MyApp
