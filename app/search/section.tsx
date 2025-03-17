"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ItemCard } from "../../components/ItemCard"
import SearchIcon from "../../assets/searchIcon.svg"

import type { Item, Building } from "../../interfaces"
import Link from "next/link"

export default function SearchSection({ searchInput, data }: {
  searchInput: string,
  data: {
    items: Item[],
    buildings: Building[]
  }
}) {
  const router = useRouter()

  const [searchValue, setSearchValue] = useState(searchInput)
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
          }}>
          <input
            className="w-full h-full bg-main-bg lg:mb-4 px-4 outline-none"
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
          Search results for  (<span className="text-main-orange"> {searchInput}</span>)
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
      <Link href="/deprecated" className='w-full h-6 sm:h-8 flex items-center justify-center bg-error hover:bg-red-600 mb-2 lg:mb-4'>
        <p className='text-white text-center text-xs sm:text-base'>{selectedCategory} are deprecated</p>
      </Link>
      <div className="w-full min-h-[calc(100%-96px)] grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1 lg:gap-2 justify-center bg-light-bg p-2 lg:p-3">
        {items.length == 0 && buildings.length == 0 ? (
          <div className="w-full h-full col-span-full flex items-center justify-center">
            <p className="font-secondary">No {selectedCategory} found</p>
          </div>
        ) : selectedCategory == "items" ? (
          items.length > 0 ? (
            items.map((item: Item, i: number) => {
              return (
                <ItemCard item={item} key={i} />
              )
            })
          ) : (
            <div className="w-full h-full col-span-full flex items-center justify-center">
              <p className="font-secondary">No items found</p>
            </div>
          )
        ) : selectedCategory == "buildings" && (
          buildings.length > 0 ? (
            buildings.map((building: Building, i: number) => {
              return (
                <ItemCard item={building} isBuilding={true} key={i} />
              )
            })
          ) : (
            <div className="w-full h-full col-span-full flex items-center justify-center">
              <p className="font-secondary">No buildings found</p>
            </div>
          )
        )}
      </div>
    </>
  )
}