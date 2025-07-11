"use client"

import Link from "next/link"
import { usePioneerStore } from "../utils/zustand"
import { useEffect, useState } from "react"

interface BlueprintOwnerSectionProps {
  id: number
  pioneerName: string
  visibility?: string
  type?: "blueprint" | "blueprintPack"
}

export default function BlueprintOwnerSection({ id, pioneerName, visibility, type = "blueprint" }: BlueprintOwnerSectionProps) {
  const currentPioneerName = usePioneerStore((state) => state.name)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    setIsOwner(currentPioneerName === pioneerName)
  }, [currentPioneerName, pioneerName])

  if (!isOwner) return null

  return (
    <div className="w-full flex flex-row flex-wrap items-center justify-between bg-main-bg text-white p-4 mb-2 lg:mb-4">
      <p className="text-lg font-semibold mr-2">
        You own this {type === "blueprint" ? "blueprint" : "blueprint pack"}.
        {visibility && (
          <span className="ml-2">
            This is {visibility == "unlisted" ? "an" : "a"}
            <span className={
              visibility === "public"
                ? "text-green-400 font-bold ml-1"
                : visibility === "unlisted"
                  ? "text-orange-400 font-bold ml-1"
                  : "text-red-400 font-bold ml-1"
            }>
              {`${visibility}`}
            </span> blueprint.
          </span>
        )}
      </p>
      <Link href={`/${type === "blueprint" ? "edit-blueprint" : "edit-blueprint-pack"}/${id}`} className="flex items-center">
        <button className="px-2 py-1 bg-light-bg rounded-sm hover:bg-main-orange hover:text-white">Edit {type === "blueprint" ? "Blueprint" : "Blueprint Pack"}</button>
      </Link>
    </div>
  )
}
