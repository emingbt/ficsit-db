"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import PreferencesModal from "./PreferencesModal"

const updateGtagConsent = (options: {
  analytics: boolean
  ads: boolean
}) => {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: options.analytics ? "granted" : "denied",
      ad_storage: options.ads ? "granted" : "denied",
      ad_user_data: options.ads ? "granted" : "denied",
      ad_personalization: options.ads ? "granted" : "denied",
    })

    // Send custom GA event
    window.gtag("event", "consent_choice", {
      analytics_consent: options.analytics,
      ads_consent: options.ads,
    })
  }
}

const CookieConsent = () => {
  const [consent, setConsent] = useState<boolean | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("cookieConsentOptions")
    if (stored) {
      const parsed = JSON.parse(stored)
      updateGtagConsent(parsed)
      setConsent(true)
    } else {
      setConsent(false)
    }
  }, [])

  const handleAcceptAll = () => {
    const options = { analytics: true, ads: true }
    localStorage.setItem("cookieConsentOptions", JSON.stringify(options))
    updateGtagConsent(options)
    setConsent(true)
  }

  if (consent === null || consent === true) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-50">
        <p className="text-sm">
          We use cookies and similar technologies to analyze traffic and deliver personalized content and ads.
          Click "Accept All" to consent, or choose what to allow. See our{" "}
          <Link href="/privacy-policy" className="text-blue-400 underline">
            Privacy Policy
          </Link>.
        </p>
        <div className="w-full flex justify-between sm:justify-end gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="w-36 text-main-gray text-sm hover:underline"
          >
            Manage Preferences
          </button>
          <button
            onClick={handleAcceptAll}
            className="w-28 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm"
          >
            Accept All
          </button>
        </div>
      </div>

      {showModal && (
        <PreferencesModal
          onClose={() => setShowModal(false)}
          onSave={(options) => {
            localStorage.setItem("cookieConsentOptions", JSON.stringify(options))
            updateGtagConsent(options)
            setConsent(true)
            setShowModal(false)
          }}
        />
      )}
    </>
  )
}

export default CookieConsent
