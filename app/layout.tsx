import React, { Suspense } from 'react'
import { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Roboto } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import GoogleAdsense from '../utils/googleAdsense'
import './global.css'

import Header from '../components/Header'
import Footer from '../components/Footer'
import CookieConsent from '../components/CookieConsent'
import { PostHogProvider } from '../utils/postHog'

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-main" })
const inter = Inter({ subsets: ["latin"], variable: "--font-secondary" })

export const metadata: Metadata = {
  title: 'Ficsit DB - Built by pioneers for pioneers',
  description: `FicsitDB is the complete database for Satisfactory players!
    Explore a vast collection of in-game items, buildings, and recipes to
    optimize your factory. Browse, share, and download community-made
    blueprints to streamline your production. Whether you're planning efficient
    layouts or searching for the best designs, FicsitDB is your go-to resource
    for everything Satisfactory.`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ficsitdb.com'),
  openGraph: {
    title: 'FicsitDB - The Ultimate Satisfactory Database',
    description: `Your go-to resource for Satisfactory! View items, buildings,
      recipes, and share blueprints with the community.`,
    url: 'https://ficsitdb.com',
    siteName: 'FicsitDB',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FicsitDB - The Ultimate Satisfactory Database',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FicsitDB - Built by Pioneers for Pioneers',
    description: `Discover the best Satisfactory blueprints, items, buildings,
      and recipes. Join the community and optimize your factory!`,
    images: ['/images/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://ficsitdb.com',
  },
  verification: {
    google: 'WZWYLdWJWsI5eWu-HQJ5TsvmE0sggGnQClIdb2nHoqQ',
  }
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <head>
        {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-JSTXP7VT57"
          strategy='afterInteractive' />
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
          `}
        </Script>
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', 'G-JSTXP7VT57');
          `}
        </Script>
        <GoogleAdsense /> */}
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JSTXP7VT57');
          `}
        </Script>
      </head>
      <body className='w-full h-full min-h-screen flex flex-col justify-between margin-0 padding-0 bg-dark-bg text-white font-secondary'>
        <div className="w-full flex flex-col">
          <Suspense fallback={<header className='w-full h-16 bg-dark-bg' />} >
            <Header />
          </Suspense>
          <div className='w-full h-full min-h-[calc(100vh-4rem)] flex flex-col items-center p-5 xl:p-8 lg:mt-16 bg-main-bg'>
            <PostHogProvider>
              {children}
            </PostHogProvider>
            <SpeedInsights />
            <Analytics />
          </div>
        </div>
        <CookieConsent />
        <Footer />
      </body>
    </html>
  )
}