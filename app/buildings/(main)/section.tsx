import Image from 'next/image'
import Link from 'next/link'
import { getBuildings } from '../../../utils/gameDataFetcher'

export default async function BuildingsSection({ selectedCategory }: { selectedCategory: string }) {
  const buildingsByCategory = await getBuildings(selectedCategory)

  if (!buildingsByCategory) {
    return (
      <section className="w-full h-full flex items-center justify-center bg-main-bg">
        <p className="text-xl">No buildings found</p>
      </section>
    )
  }

  return (
    <section className="w-full h-full flex flex-col items-center justify-center bg-main-bg">
      {buildingsByCategory.map((category: any, i: number) => {
        return (
          <div className="w-full flex flex-col" key={i}>
            <div className="w-full bg-main-bg p-2 pl-4">
              <h2>{i + 1}. {category.name}</h2>
            </div>
            <div className="w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 p-2 bg-light-bg">
              {category.buildings.map((building: any, j: number) => {
                return (
                  <Link href={`/buildings/${building.slug}`} className="w-full flex flex-col bg-main-bg hover:bg-dark-bg cursor-pointer" key={j}>
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
  )
}