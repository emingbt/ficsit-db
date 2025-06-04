"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ItemCard } from "../../components/ItemCard"
import SearchIcon from "../../assets/searchIcon.svg"

import type { Item, Building, BlueprintCardProps } from "../../interfaces"
import BlueprintCard from "../../components/BlueprintCard"

export default function SearchSection({ searchInput, data }: {
  searchInput: string,
  data: {
    items: Item[],
    buildings: Building[],
    blueprints: BlueprintCardProps[]
  }
}) {
  const router = useRouter()

  const [searchValue, setSearchValue] = useState(searchInput)
  const [selectedCategory, setSelectedCategory] = useState<"items" | "buildings" | "blueprints">("items")

  const items = data.items
  const buildings = data.buildings
  const blueprints = data.blueprints

  // If there is no element found in the selected category, show other categories
  // Blueprints is the priority category to show if it has elements
  useEffect(() => {
    if (blueprints.length > 0) {
      setSelectedCategory("blueprints")
    } else if (items.length === 0) {
      setSelectedCategory("buildings")
    }
  }, [data])

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-between">
        <form className="h-12 sm:h-9 flex lg:hidden flex-row mb-2.5"
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
        <h1 className="hidden lg:flex text-2xl pl-2">
          Search results for  (<span className="text-main-orange"> {searchInput}</span>)
        </h1>
        <div className="flex flex-row justify-end mb-2.5 lg:mb-4 text-sm sm:text-base">
          <button className={`w-full sm:w-32 p-[6px] sm:ml-2.5 lg:ml-4
            ${selectedCategory == 'items' ? 'outline outline-2 outline-offset-2 bg-main-bg' : 'bg-light-bg'}
              hover:bg-main-bg hover:outline hover:outline-1 outline-main-orange
          `}
            onClick={() => { setSelectedCategory('items') }}>
            Items ({items.length || 0})
          </button>
          <button className={`w-full sm:w-32 p-[6px] sm:ml-2.5 lg:ml-4
            ${selectedCategory == 'buildings' ? 'outline outline-2 outline-offset-2 bg-main-bg' : 'bg-light-bg'}
              hover:bg-main-bg hover:outline hover:outline-1 outline-main-orange
          `}
            onClick={() => { setSelectedCategory('buildings') }}>
            Buildings ({buildings.length || 0})
          </button>
          <button className={`w-full sm:w-32 p-[6px] sm:ml-2.5 lg:ml-4
            ${selectedCategory == 'blueprints' ? 'outline outline-2 outline-offset-2 bg-main-bg' : 'bg-light-bg'}
              hover:bg-main-bg hover:outline hover:outline-1 outline-logo-blue
          `}
            onClick={() => { setSelectedCategory('blueprints') }}>
            Blueprints ({blueprints.length || 0})
          </button>
        </div>
      </div>
      <div className='w-full h-full bg-light-bg'>
        <div className={`w-full grid
        ${selectedCategory == "blueprints" ?
            "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" :
            "grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
          }
        gap-[1px] lg:gap-2 justify-center p-1 lg:p-3`}>
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
      </div>
    </>
  )
}