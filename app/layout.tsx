import React, { Suspense } from 'react'
import { Metadata } from 'next'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import GoogleAdsense from '../utils/googleAdsense'
import './global.css'

import Header from '../components/header'
import Footer from '../components/footer'
import CookieConsent from '../components/cookieConsent'

export const metadata: Metadata = {
  title: 'Ficsit DB',
  description: 'Ficsit DB is a database for Satisfactory items, buildings and recipes.'
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='font-main'>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-JSTXP7VT57" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-JSTXP7VT57');
        `}
      </Script>
      <GoogleAdsense />
      <meta name="google-adsense-account" content="ca-pub-1772997678438254"></meta>
      <body className='w-full h-full min-h-screen flex flex-col justify-between margin-0 padding-0 bg-dark-bg text-white'>
        <div className='w-full flex flex-col'>
          <Suspense fallback={<header className='w-full h-16 bg-dark-bg' />} >
            <Header />
          </Suspense>
          <div className='w-full h-full min-h-[calc(100vh-4rem)] flex flex-col items-center p-5 xl:p-8 lg:mt-16 bg-main-bg'>
            {children}
            <SpeedInsights />
          </div>
        </div>
        <CookieConsent />
        <Footer />
      </body>
    </html>
  )
}