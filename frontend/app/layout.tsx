import React, { Suspense } from 'react'
import { Metadata } from 'next'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './global.css'

import Header from '../components/header'
import Footer from '../components/footer'

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
      <body className='w-full h-full min-h-screen flex flex-col justify-between margin-0 padding-0 bg-dark-bg text-white'>
        <div className='w-full flex flex-col'>
          <Suspense fallback={<header className='w-full h-16 bg-dark-bg' />} >
            <Header />
          </Suspense>
          <div className='w-full h-full flex flex-col items-center bg-main-bg p-5 xl:p-8'>
            {children}
            <SpeedInsights />
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}