"use client"

import Script from "next/script"
import { useState, useEffect } from "react"

declare global {
  interface Window {
    adsbygoogle?: { push: (params?: any) => void }
  }
}

export default function GoogleAdsense() {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (window.adsbygoogle) {
      setScriptLoaded(true)
    }
  }, [])

  return (
    <Script
      strategy="afterInteractive"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1772997678438254"
      crossOrigin="anonymous"
      onLoad={() => setScriptLoaded(true)}
    />
  )
}
