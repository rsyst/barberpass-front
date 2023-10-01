import { AppProps } from 'next/app'
import Head from 'next/head'
import Providers from '@shared/providers'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Barberpass</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06092B" />
        <meta name="description" content="Gerencie de forma fácil e rápida seus agendamentos." />
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  )
}

export default App
