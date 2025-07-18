"use client"

import { useState } from 'react'
import { Filter, SortDesc } from 'lucide-react'
import Link from 'next/link'
import BlueprintCard from './BlueprintCard'
import type { BlueprintCardProps, BlueprintPackCardProps } from '../interfaces'
import BlueprintPackCard from './BlueprintPackCard'

type Filter = {
  category?: string
  sort?: string
}

const categories = [
  'Architecture',
  'Belts',
  'Compact',
  'Decorations',
  'Foundations',
  'Hypertubes',
  'Load Balancer',
  'Logistics',
  "Modded",
  'Pipes',
  'Power',
  'Production',
  'Roads',
  'Signs',
  'Storage',
  'Supports',
  'Tracks',
  'Trains',
  'Transportation'
]

export default function BlueprintContainer({ entries, title, filter, isEdit = false, type = "blueprint" }: { entries: BlueprintCardProps[] | BlueprintPackCardProps[], title: string, filter?: Filter, isEdit?: boolean, type?: "blueprint" | "blueprintPack" }) {
  const [isCategoriesOpened, setIsCategoriesOpened] = useState(false)
  const [isSortOpened, setIsSortOpened] = useState(false)
  const selectedCategory = filter?.category
  const selectedSort = filter?.sort || "newest"

  return (
    <div className='w-full flex flex-col flex-grow'>
      <div className="w-full flex flex-wrap items-center justify-between bg-main-bg p-2 pl-4">
        <h1 className="text-lg sm:text-xl font-medium">{title}</h1>
        {
          filter &&
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 ${isCategoriesOpened ? "bg-logo-blue text-black" : "bg-light-bg"} lg:hover:bg-logo-blue lg:hover:text-black py-1 px-2 font-secondary rounded-sm cursor-pointer`}
              onClick={() => {
                setIsCategoriesOpened(!isCategoriesOpened)
                setIsSortOpened(false)
              }}
            >
              <p className='text-sm sm:text-base select-none'>Filter</p>
              <Filter size={16} className={`text-${isCategoriesOpened ? "black" : selectedCategory ? "logo-blue" : "white"}`} />
            </div>
            <div
              className={`flex items-center gap-2 ${isSortOpened ? "bg-logo-blue text-black" : "bg-light-bg"}
               lg:hover:bg-logo-blue lg:hover:text-black py-1 px-2 font-secondary rounded-sm cursor-pointer relative`
              }
              onClick={() => {
                setIsSortOpened(!isSortOpened)
                setIsCategoriesOpened(false)
              }}
            >
              <p className='text-sm sm:text-base select-none'>Sort By</p>
              <SortDesc size={20} className={`text-${selectedSort != "newest" ? "logo-blue" : "white"}`} />
              <div className={`${isSortOpened ? "flex" : "hidden"} flex-col absolute top-10 right-0 bg-main-bg p-4 rounded-md shadow-md z-10 gap-4`}>
                {
                  ["newest", "oldest", "rating", "download"].map((sort, i) => {
                    return (
                      <Link
                        key={i}
                        href={`/${type == "blueprint" ? "blueprints" : "blueprint-packs"}${selectedCategory ? `?category=${selectedCategory}&sort=${sort}` : `?sort=${sort}`}  `}
                        className={`${selectedSort == sort ? "bg-logo-blue text-black hover:text-white" : "bg-light-bg text-white hover:text-logo-blue"}  px-3 py-2 text-sm sm:text-base rounded-sm cursor-pointer`}
                      >
                        {sort}
                      </Link>
                    )
                  })
                }
              </div>
            </div>
          </div>
        }
      </div>
      {
        isCategoriesOpened &&
        <div>
          <div className="w-full flex flex-wrap items-center bg-main-bg p-4 gap-4">
            {
              categories.map((category, i) => {
                return (
                  <Link
                    key={i}
                    href={`${selectedCategory == category ?
                      `/${type == "blueprint" ? "blueprints" : "blueprint-packs"}` :
                      `/${type == "blueprint" ? "blueprints" : "blueprint-packs"}/?category=${category}${selectedSort ? `&sort=${selectedSort}` : ""}`
                      }`}
                    className={`${selectedCategory == category ? "bg-logo-blue text-black" : "bg-light-bg hover:text-logo-blue"} px-3 py-2 text-sm sm:text-base rounded-sm cursor-pointer`}
                  >
                    {category}
                  </Link>
                )
              })
            }
          </div>
        </div>
      }
      <div className='w-full h-full bg-light-bg'>
        <section className='w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-3 p-2 lg:p-3'>
          {
            entries?.length > 0 ?
              entries.map((enrty, i: number) => {
                if (type === "blueprint") {
                  return (
                    <BlueprintCard key={i} blueprint={enrty} isEdit={isEdit} />
                  )
                } else {
                  return (
                    <BlueprintPackCard key={i} blueprintPack={enrty} isEdit={isEdit} />
                  )
                }
              }) :
              <div className='w-full h-full flex items-center justify-center col-span-5'>
                <p className='text-base lg:text-lg xl:text-xl'>No {type == "blueprint" ? "blueprints" : "blueprint packs"} found</p>
              </div>
          }
        </section>
      </div>
    </div>
  )
}