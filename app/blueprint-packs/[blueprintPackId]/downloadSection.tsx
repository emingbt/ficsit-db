"use client"

import Link from "next/link"
import { useState } from "react"
import { saveAs } from "file-saver"
import { downloadZip } from "client-zip"
import { incrementDownloads } from "./action"

interface DownloadSectionProps {
  blueprintPackId: number
  blueprintPackTitle: string
  blueprintsInPack: {
    id: number
    title: string
    images: string[]
    files: string[]
    averageRating: number
  }[]
  pioneerName: string
}

export default function DownloadSection({ blueprintPackId, blueprintPackTitle, blueprintsInPack, pioneerName }: DownloadSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  let fileLinks: string[] = []
  blueprintsInPack.forEach((blueprint) => {
    if (blueprint.files && blueprint.files.length > 0) {
      fileLinks.push(...blueprint.files)
    }
  })

  async function handleDownloadAll() {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch all files as blobs
      const files = await Promise.all(
        fileLinks.map(async (url, idx) => {
          const response = await fetch(url)
          if (!response.ok) throw new Error(`Failed to fetch file: ${url}`)
          const blob = await response.blob()
          // Try to get a filename from the URL
          const name = decodeURIComponent(url.split("/").pop() || `blueprint_${idx}.sbp`)
          return { name, input: blob }
        })
      )
      const zipBlob = await downloadZip(files).blob()
      saveAs(zipBlob, `${blueprintPackTitle}.zip`)
      await incrementDownloads(blueprintsInPack.map(bp => bp.id), pioneerName)
    } catch (err: any) {
      setError(err.message || "Download failed.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full lg:w-1/3 min-h-64 sm:min-h-48 flex relative flex-grow flex-col sm:flex-row lg:flex-col 2xl:flex-row items-center justify-evenly font-bold sm:pb-0 xl:p-0 bg-foo">
      <div className={`w-48 lg:w-64 h-16 bg-logo-blue text-black ${!isLoading && "hover:text-logo-blue hover:bg-main-bg"} rounded`}>
        <button
          className="w-full h-full flex items-center justify-center text-sm lg:text-base disabled:opacity-60"
          onClick={handleDownloadAll}
          disabled={isLoading}
        >
          {isLoading ? "Downloading..." : "Download All Blueprints"}
        </button>
      </div>
      {error && (
        <div className="text-red-500 mt-2 text-xs">{error}</div>
      )}
      <Link href={"/faq"} className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center bg-light-bg rounded-full text-sm lg:text-base text-white hover:text-logo-blue hover:bg-main-bg cursor-pointer">
        <p className="text-center font-bold">?</p>
      </Link>
    </div>
  )
}