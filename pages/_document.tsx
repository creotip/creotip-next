import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/*<link*/}
          {/*  href="https://fonts.googleapis.com/css2?family=Inter&display=optional"*/}
          {/*  rel="stylesheet"*/}
          {/*/>*/}
          {/*<link*/}
          {/*  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap"*/}
          {/*  rel="stylesheet"*/}
          {/*/>*/}
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
