"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ItemCard } from "../itemCard"
import SearchIcon from "../../assets/searchIcon.svg"

import type { Item, BuildingType } from "../../interfaces"

export default function SearchSection({ data }: {
  data: {
    items: Item[],
    buildings: BuildingType[]
  }
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const name = searchParams?.get('name') || ""

  const [searchValue, setSearchValue] = useState(name)
  const [selectedCategory, setSelectedCategory] = useState<"items" | "buildings">("items")

  const items = data.items
  const buildings = data.buildings

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-end">
        <form className="w-full h-12 sm:h-8 flex lg:hidden flex-row mb-2.5"
          onSubmit={(e) => {
            e.preventDefault()
            router.push(`/search?name=${searchValue}`)
            router.refresh()
          }}>
          <input
            className="w-full h-full bg-main-bg lg:mb-4 px-4"
            type="text"
            placeholder="Search something..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          />
          <button
            className="w-12 sm:w-8 h-full flex items-center justify-center bg-main-orange lg:mb-4"
            type="submit"
          >
            <SearchIcon />
          </button>
        </form>
        <h1 className="w-full hidden lg:flex text-2xl pl-2">
          Search results for  (<span className="text-main-orange"> {name}</span>)
        </h1>
        <div className="flex flex-row justify-end mb-2.5 lg:mb-4">
          <button className={`w-full sm:w-32 h-8 sm:ml-2.5 lg:ml-4
          bg-${selectedCategory == 'items' ? 'main-orange' : 'light-bg'}`}
            onClick={() => { setSelectedCategory('items') }}>
            Items ({items.length || 0})
          </button>
          <button className={`w-full sm:w-32 h-8 ml-2.5 lg:ml-4
          bg-${selectedCategory == 'buildings' ? 'main-orange' : 'light-bg'}`}
            onClick={() => { setSelectedCategory('buildings') }}>
            Buildings ({buildings.length || 0})
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1 lg:gap-2 justify-center bg-light-bg p-2 lg:p-3">
        {items.length == 0 && buildings.length == 0 ? (
          <p className="text-white">No {selectedCategory} found</p>
        ) : selectedCategory == "items" ? (
          items.length > 0 ? (
            items.map((item: Item, i: number) => {
              return (
                <ItemCard item={item} key={i} />
              )
            })
          ) : (
            <p className="text-white">No items found</p>
          )
        ) : selectedCategory == "buildings" && (
          buildings.length > 0 ? (
            buildings.map((building: BuildingType, i: number) => {
              return (
                <ItemCard item={building} isBuilding={true} key={i} />
              )
            })
          ) : (
            <p className="text-white">No buildings found</p>
          )
        )}
      </div>
    </>
  )
}