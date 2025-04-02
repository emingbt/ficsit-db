"use client"

import Link from "next/link"
import { incrementDownloads } from "./action"

export default function DownloadSection({ id, files, pioneerName }: { id: number, files: string[], pioneerName: string }) {
  const handleDownload = () => {
    incrementDownloads(id, pioneerName)
  }

  return (
    <div className="w-full lg:w-1/3 min-h-64 sm:min-h-48 flex flex-grow flex-col sm:flex-row lg:flex-col 2xl:flex-row items-center justify-evenly font-bold pb-6 sm:pb-0 lg:pb-8 xl:p-0 bg-foo">
      <div className="w-36 lg:w-48 h-16 bg-logo-blue hover:text-logo-blue hover:bg-main-bg rounded">
        <Link
          href={files[0]}
          onClick={handleDownload}
          className="w-full h-full flex items-center justify-center text-sm lg:text-base text-black hover:text-logo-blue"
        >
          Download SBP
        </Link>
      </div>
      <div className="w-36 lg:w-48 h-16 bg-light-bg rounded">
        <Link
          href={files[1]}
          className="w-full h-full flex items-center justify-center text-sm lg:text-base text-white hover:text-logo-blue hover:bg-main-bg"
        >
          Download SBPCFG
        </Link>
      </div>
    </div>
  )
}