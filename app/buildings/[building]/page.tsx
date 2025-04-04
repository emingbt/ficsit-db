import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { getBuilding } from '../../../utils/gameDataFetcher'
import BuildingExtension from '../../../components/building/BuildingExtension'
import Recipes from '../../../components/Recipes'
import ExtractableResources from '../../../components/building/ExtractableResources'
import Fuels from '../../../components/building/Fuels'
import Main from '../../../components/Main'

export async function generateMetadata({ params }: { params: { building: string } }): Promise<Metadata> {
  const data = await getBuilding(params.building)
  const building = data?.building

  // If building is not found, return a default metadata
  if (!building) {
    return {
      title: "Building Not Found - FicsitDB",
      description: "Building not found in FicsitDB.",
    }
  }

  return {
    title: building ? `${building.name} - FicsitDB` : "Building Not Found - FicsitDB",
    description: building ? `Discover how to build and use the ${building.name} in Satisfactory.` : "Building not found in FicsitDB.",
  }
}

export default async function BuildingPage({ params }: { params: { building: string } }) {
  const slug = params.building
  const data = await getBuilding(slug)

  if (!data) {
    return (
      <main className="w-full h-full flex items-center justify-center bg-main-bg">
        <p className="text-xl">Building not found</p>
      </main>
    )
  }

  const building = data.building
  const recipes = data.recipes
  const fuels = data.fuels

  return (
    <Main classname="bg-dark-bg" dontFill>
      <Link href="/deprecated" className='w-full h-6 flex sm:hidden items-center justify-center bg-red-800 hover:bg-red-700'>
        <p className='text-white text-center text-xs'>Buildings are deprecated</p>
      </Link>
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
            <div className="w-full h-1/2 flex items-center justify-center bg-black lg:text-lg font-secondary">
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
        <div className="w-full md:w-2/5 h-full sm:h-32 md:h-40 lg:h-48 relative flex items-center justify-center text-xs lg:text-sm px-6 py-3">
          <Link href="/deprecated" className='w-full h-8 hidden absolute top-0 sm:flex items-center justify-center bg-red-800 hover:bg-red-700'>
            <p className='text-white text-center'>Buildings are deprecated</p>
          </Link>
          <p>{building.description}</p>
        </div>
      </section>
      <BuildingExtension building={building} />
      <Recipes recipes={recipes} />
      <ExtractableResources resources={building.resources} />
      <Fuels fuels={fuels} />
    </Main>
  )
}