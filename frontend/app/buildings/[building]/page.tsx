import Image from 'next/image'
import Link from 'next/link'

import BuildingExtension from '../../../components/buildingExtension'
import Recipes from '../../../components/recipes'

import { BuildingType } from '../../../interfaces'

export default async function Building({ params }: { params: { building: string } }) {
  const slug = params.building

  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000'
  const result = await fetch(`${baseUrl}/api/building?slug=${slug}`, { cache: 'no-store' })
  const data = await result.json()

  const building: BuildingType = data.building
  const recipes = data.recipes

  return (
    <>
      <section className="w-full flex flex-col md:flex-row items-center justify-center bg-main-bg text-xs sm:text-sm">
        <div className="w-full md:w-3/5 h-24 sm:h-32 md:h-40 lg:h-48 flex flex-row items-center justify-center">
          <div className="h-full aspect-square bg-light-bg p-2">
            <div className="w-full h-full relative">
              <Image
                src={building.imgUrl}
                fill
                sizes="100%"
                alt={building.name}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <div className="w-full h-1/2 flex items-center justify-center bg-black lg:text-lg">
              {building.name}
            </div>
            <div className="w-full flex items-center text-xs sm:text-sm px-4 sm:py-1 bg-main-orange">
              <p>Cost</p>
            </div>
            <div className="w-full h-full flex flex-wrap items-center justify-center px-4">
              {building.cost.map((item, index: number) => (
                <div key={index} className="flex flex-row items-center justify-center px-1 lg:px-2">
                  <p className='pr-1 font-secondary'>{item.amount}x</p>
                  <Link href={`/items/${item.slug}`}
                    className='h-5 sm:h-10 lg:h-12 aspect-square bg-light-bg lg:hover:bg-main-orange rounded-sm sm:rounded-md p-0.5 sm:p-1 cursor-pointer'>
                    <div className='w-full h-full relative'>
                      <Image
                        src={item.imgUrl}
                        fill
                        alt={item.slug}
                        style={{ objectFit: 'contain' }}
                        sizes='50%'
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 h-auto md:h-full flex items-center justify-center text-xs lg:text-sm px-6 py-3">
          <p>{building.description}</p>
        </div>
      </section>
      <BuildingExtension building={building} />
      <Recipes recipes={recipes} />
    </>
  )
}