"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import BuildingCategories from "../../../components/buildingCategories"

export default async function Buildings() {
  const pathNames = usePathname()
  const selectedCategory = pathNames?.split("/")[2] || "production"

  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000'
  const result = await fetch(`${baseUrl}/api/buildings?category=${selectedCategory}`)
  const categories = await result.json()

  return (
    <>
      <BuildingCategories selectedCategory={selectedCategory} />
      <div className="w-full bg-dark-bg p-4 mt-7 xl:mt-5">
        <section className="w-full h-full flex flex-col items-center justify-center bg-main-bg">
          {categories.map((category: any, i: number) => {
            return (
              <div className="w-full flex flex-col" key={i}>
                <div className="w-full bg-main-bg p-2 pl-4">
                  <h2>{i + 1}. {category.name}</h2>
                </div>
                <div className="w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 p-2 bg-light-bg">
                  {category.buildings.map((building: any, j: number) => {
                    return (
                      <Link href={`/buildings/${selectedCategory}/${building.slug}`} className="w-full flex flex-col bg-main-bg hover:bg-dark-bg cursor-pointer" key={j}>
                        <div className="w-full flex items-center justify-center p-1 sm:p-2 xl:p-3">
                          <div className="w-full aspect-square relative">
                            <Image
                              src={building.imgUrl}
                              alt={building.name}
                              fill
                              sizes='100%'
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                        </div>
                        <div className="h-full flex items-center justify-center p-2 bg-dark-bg text-xs lg:text-base">
                          <p>{building.name}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </>
  )
}