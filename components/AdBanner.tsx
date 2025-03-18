"use client"

import { useEffect, useState } from "react"

type AdBannerProps = {
  classname: string
  dataAdSlot: string
  dataAdFormat?: string
  dataFullWidthResponsive?: boolean
}

export default function AdBanner({ classname, dataAdSlot, dataFullWidthResponsive = false, dataAdFormat = "auto", }: AdBannerProps) {
  const [adsLoaded, setAdsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ✅ Ensure adsbygoogle is correctly initialized as an array
      window.adsbygoogle = window.adsbygoogle || { push: () => { } }

      if (!adsLoaded) {
        try {
          window.adsbygoogle.push({})
          setAdsLoaded(true)
        } catch (error: any) {
          console.error("AdSense Error:", error.message)
        }
      }
    }
  }, [adsLoaded])

  return (
    <div className={`${classname} relative bg-main-bg text-gray-600 text-lg lg:text-xl font-semibold`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client="ca-pub-1772997678438254"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      ></ins>
      <div className="absolute w-full h-full flex items-center justify-center">
        Ad
      </div>
    </div>
  )
}