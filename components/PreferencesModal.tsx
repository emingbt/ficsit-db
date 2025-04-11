"use client"
import { useState } from "react"

type Props = {
  onClose: () => void
  onSave: (options: { analytics: boolean; ads: boolean }) => void
}

const PreferencesModal = ({ onClose, onSave }: Props) => {
  const [analytics, setAnalytics] = useState(true)
  const [ads, setAds] = useState(true)

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-dark-bg text-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Manage Cookie Preferences</h2>

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={analytics}
              onChange={() => setAnalytics(!analytics)}
            />
            <span>Allow analytics cookies</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={ads}
              onChange={() => setAds(!ads)}
            />
            <span>Allow personalized ads and tracking</span>
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-sm bg-light-bg hover:bg-main-bg text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={() => onSave({ analytics, ads })}
            className="bg-logo-blue hover:bg-logo-blue text-dark-bg px-4 py-2 text-sm rounded"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreferencesModal
