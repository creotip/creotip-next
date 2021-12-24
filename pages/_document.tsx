import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap"
            rel="stylesheet"
          />
          {/*<script*/}
          {/*  async*/}
          {/*  src="https://ackee-creotip.vercel.app/tracker.js"*/}
          {/*  data-ackee-server="https://ackee-creotip.vercel.app"*/}
          {/*  data-ackee-domain-id="ea31e3cd-6c5a-48a4-b290-99b4f734950e"*/}
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
