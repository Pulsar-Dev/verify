import '@/styles/globals.scss'
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
      <>
        <Head>
          <link rel="icon" href={`/img/white.png`}/>
          <title>Pulsar Verify</title>
        </Head>
        <Component {...pageProps} />
        <div className="bg-gradient"></div>
      </>
  )
}
