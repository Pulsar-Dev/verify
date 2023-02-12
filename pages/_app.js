import '@/styles/globals.scss'
import Head from 'next/head'
import { ThemeProvider, useTheme } from 'next-themes'

export default function App({ Component, pageProps }) {
  const { resolvedTheme } = useTheme()
  return (
    <>
      <Head>
        <link rel="icon" href={`/img/white.png`} />
        <title>Pulsar Verify</title>
      </Head>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
        {resolvedTheme === 'light' ? (
          <div className="bg-gradient"></div>
        ) : (
          <div className="bg-gradient-dark"></div>
        )}
      </ThemeProvider>
    </>
  )
}
