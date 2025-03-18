"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

const CookieConsent = () => {
  const [consent, setConsent] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localConsent = localStorage.getItem("cookieConsent")
      if (localConsent === "true") {
        setConsent(true)
      } else {
        setConsent(false)
      }
    }
  }, [])

  const handleConsent = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", "true")
      setConsent(true)
    }
  }

  if (consent || consent === null) {
    return null // Don't show the banner if consent has been given or not yet determined
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <p>
        We use cookies to personalise content and ads, to provide social media features and to analyse our traffic.
        By continuing to use our site, you agree to our use of cookies. For more information, read our{" "}
        <Link href="/privacy-policy" className="text-blue-400 underline">
          Privacy Policy
        </Link>.
      </p>
      <button onClick={handleConsent} className="bg-blue-500 px-4 py-2 rounded">
        Accept
      </button>
    </div>
  )
}

export default CookieConsent
