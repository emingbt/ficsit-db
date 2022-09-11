import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import Footer from '../components/footer'
import Header from '../components/header'
import Script from 'next/script'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: #202125;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: Industrial Branding;
    src: url('/fonts/INDUSTRIAL-BRANDING.ttf') format('truetype');
    font-display: optional;
  }

  @font-face {
    font-family: Roboto;
    src: url("https://use.typekit.net/let8ssp.css") format("css")
  }
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-V0ENMPG75B"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-V0ENMPG75B');
        `}
      </Script>

      <Head>
        <title>FICSIT DB</title>
        <meta name="description" content="Satisfactory Encyclopedia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
