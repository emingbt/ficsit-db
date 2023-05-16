import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import Footer from '../components/footer'
import Header from '../components/header'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { Analytics } from '@vercel/analytics/react'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
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
    font-family: "Industrial Branding";
    src: url('/fonts/INDUSTRIAL-BRANDING.ttf');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>FICSIT DB</title>
        <meta name="description" content="Browse all items you need in Satisfactory. You can find all items, buildings and recipes you need." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <GlobalStyle />
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
      <Analytics />
      <Footer />
    </>
  )
}

export default MyApp
