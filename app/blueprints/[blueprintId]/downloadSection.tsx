"use client"

import Link from "next/link"
import { useState } from "react"
import { incrementDownloads } from "./action"
import DownloadIcon from "../../../assets/downloadIcon.svg"
import StarIcon from "../../../assets/starIcon.svg"


export default function DownloadSection({ id, files, downloads, averageRating }: { id: number, files: string[], downloads: number, averageRating: number }) {
  const [downloadCount, setDownloadCount] = useState(downloads)

  const handleDownload = () => {
    incrementDownloads(id)
    setDownloadCount(downloadCount + 1)
  }

  return (
    <div className="w-full lg:w-1/3 min-h-64 sm:min-h-48 flex flex-grow flex-col sm:flex-row lg:flex-col 2xl:flex-row items-center justify-evenly relative pb-6 sm:pb-0 lg:pb-8 xl:p-0 bg-foo">
      <div className="w-36 lg:w-48 h-16 bg-light-bg rounded">
        <Link
          href={files[0]}
          onClick={handleDownload}
          className="w-full h-full flex items-center justify-center text-sm lg:text-base lg:font-medium text-white hover:text-logo-blue hover:bg-main-bg"
        >
          Download SBP
        </Link>
      </div>
      <div className="w-36 lg:w-48 h-16 bg-light-bg rounded">
        <Link
          href={files[1]}
          className="w-full h-full flex items-center justify-center text-sm lg:text-base lg:font-medium text-white hover:text-logo-blue hover:bg-main-bg"
        >
          Download SBPCFG
        </Link>
      </div>
      <div className="flex flex-row gap-1 absolute bottom-4">
        <DownloadIcon className="w-6 h-6 stroke-logo-blue" />
        <p className="text-logo-blue font-medium">{downloadCount}</p>
        <StarIcon className="w-5 h-5 fill-main-orange mt-0.5 ml-4" />
        <p className="text-main-orange font-medium">{averageRating}</p>
      </div>
    </div>
  )
}