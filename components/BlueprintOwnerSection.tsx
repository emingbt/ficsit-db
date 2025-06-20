"use client"

import Link from "next/link"
import { usePioneerStore } from "../utils/zustand"
import { useEffect, useState } from "react"

interface BlueprintOwnerSectionProps {
  blueprintId: number
  pioneerName: string
}

const BlueprintOwnerSection: React.FC<BlueprintOwnerSectionProps> = ({ blueprintId, pioneerName }) => {
  const currentPioneerName = usePioneerStore((state) => state.name)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    setIsOwner(currentPioneerName === pioneerName)
  }, [currentPioneerName, pioneerName])

  if (!isOwner) return null

  return (
    <div className="w-full flex flex-row flex-wrap items-center justify-between bg-main-bg text-white p-4 mb-4">
      <p className="text-lg font-semibold mr-2">You own this blueprint.</p>
      <Link href={`/edit-blueprint/${blueprintId}`}>
        <button className="px-2 py-1 bg-light-bg rounded-sm hover:bg-main-orange hover:text-white">Edit Blueprint</button>
      </Link>
    </div>
  )
}

export default BlueprintOwnerSection
