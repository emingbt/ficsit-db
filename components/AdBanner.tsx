"use client"

import { useEffect, useState } from "react"

type AdBannerProps = {
  classname: string
  dataAdSlot: string
  dynamicHeight?: boolean
  adHeight?: number
  adPadding?: number
  dataAdFormat?: string
  dataFullWidthResponsive?: boolean
}

export default function AdBanner({ classname, dataAdSlot, dynamicHeight = true, adHeight, adPadding, dataFullWidthResponsive = false, dataAdFormat = "auto", }: AdBannerProps) {
  const [adsLoaded, setAdsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
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
      {
        dynamicHeight ? (
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              width: adPadding ? `calc(100% - ${adPadding * 2}px)` : "100%",
              height: adPadding ? `calc(100% - ${adPadding * 2}px)` : "100%",
              minWidth: "300px"
            }}
            data-ad-client="ca-pub-1772997678438254"
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
          ></ins>
        ) : (
          <div className="w-full h-full relative">
            <ins
              className="adsbygoogle"
              style={{
                display: "block",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: adPadding ? `calc(100% - ${adPadding * 2}px)` : "100%",
                height: adHeight ? `${adHeight}px` : adPadding ? `calc(100% - ${adPadding * 2}px)` : "100%",
                overflow: "hidden",
                textAlign: "center"
              }}
              data-ad-client="ca-pub-1772997678438254"
              data-ad-slot={dataAdSlot}
              data-ad-format={dataAdFormat}
              data-full-width-responsive={dataFullWidthResponsive.toString()}
            ></ins>
          </div>
        )
      }
      <div className="absolute w-full h-full flex items-center justify-center">
        Ad
      </div>
    </div>
  )
}