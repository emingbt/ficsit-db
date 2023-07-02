import React from 'react'
import { Metadata } from 'next'

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
      <body className='w-full h-full flex flex-col items-center margin-0 padding-0 bg-main-bg text-white'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}