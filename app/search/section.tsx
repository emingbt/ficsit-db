"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ItemCard } from "../../components/ItemCard"
import SearchIcon from "../../assets/searchIcon.svg"

import type { Item, Building } from "../../interfaces"
import BlueprintCard from "../../components/BlueprintCard"

export default function SearchSection({ searchInput, data }: {
  searchInput: string,
  data: {
    items: Item[],
    buildings: Building[],
    blueprints: any[]
  }
}) {
  const router = useRouter()

  const [searchValue, setSearchValue] = useState(searchInput)
  const [selectedCategory, setSelectedCategory] = useState<"items" | "buildings" | "blueprints">("items")

  const items = data.items
  const buildings = data.buildings
  const blueprints = data.blueprints

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
          <button className={`w-full sm:w-32 h-8 sm:ml-2.5 lg:ml-4 bg-${selectedCategory == 'items' ? 'main-orange' : 'light-bg'}`}
            onClick={() => { setSelectedCategory('items') }}>
            Items ({items.length || 0})
          </button>
          <button className={`w-full sm:w-32 h-8 ml-2.5 lg:ml-4 bg-${selectedCategory == 'buildings' ? 'main-orange' : 'light-bg'}`}
            onClick={() => { setSelectedCategory('buildings') }}>
            Buildings ({buildings.length || 0})
          </button>
          <button className={`w-full sm:w-32 h-8 ml-2.5 lg:ml-4 bg-${selectedCategory == 'blueprints' ? 'main-orange' : 'light-bg'}`}
            onClick={() => { setSelectedCategory('blueprints') }}>
            Blueprints ({blueprints.length || 0})
          </button>
        </div>
      </div>
      <div className={`w-full min-h-[calc(100%-96px)] grid
        ${selectedCategory == "blueprints" ?
          "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" :
          "grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
        }
        gap-1 lg:gap-2 justify-center bg-light-bg p-2 lg:p-3`}>
        {data[selectedCategory].length == 0 ? (
          <div className="w-full h-full col-span-full flex items-center justify-center">
            <p className="font-secondary">No {selectedCategory} found</p>
          </div>
        ) : selectedCategory == "blueprints" ? (
          blueprints.map((blueprint: any, i: number) => {
            return (
              <BlueprintCard key={i} blueprint={blueprint} />
            )
          })
        ) : (
          data[selectedCategory].map((element: Item | Building, i: number) => {
            return (
              <ItemCard item={element} isBuilding={selectedCategory == "buildings"} key={i} />
            )
          })
        )}
      </div>
    </>
  )
}