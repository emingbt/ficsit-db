"use client"

import { useEffect } from "react"

type DesktopAdProps = {
  dataAdSlot: string
  dataAdFormat?: string
  dataFullWidthResponsive?: boolean
}

export default function DesktopAd({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true
}: DesktopAdProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      )
    } catch (error: any) {
      console.log(error.message)
    }
  }, [])


  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", height: "100%" }}
      data-ad-client="ca-pub-1772997678438254"
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    ></ins>
  )
}