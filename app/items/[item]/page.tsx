import Link from "next/link"
import Image from "next/image"
import { getItem } from "../../../utils/gameDataFetcher"
import Recipes from "../../../components/recipes"
import Main from "../../../components/Main"

export default async function ItemPage({ params }: { params: { item: string } }) {
  const slug = params.item

  const data = await getItem(slug)

  if (!data) {
    return (
      <main className="w-full h-full flex items-center justify-center bg-main-bg">
        <p className="text-xl">Item not found</p>
      </main>
    )
  }

  const item = data.item
  const recipes = data.recipes
  const usagesAsIngredient = data.usagesAsIngredient

  return (
    <Main classname="flex flex-col bg-dark-bg" dontFill>
      <Link href="/deprecated" className='w-full h-6 flex sm:hidden items-center justify-center bg-error hover:bg-red-600'>
        <p className='text-white text-center text-xs'>Items are deprecated</p>
      </Link>
      <section className="w-full flex flex-col md:flex-row items-center justify-center bg-main-bg text-xs sm:text-sm">
        <div className="w-full md:w-3/5 h-24 sm:h-32 md:h-40 lg:h-48 flex flex-row items-center justify-center">
          <div className="h-full aspect-square bg-light-bg p-2 md:p-4">
            <div className="w-full h-full relative">
              <Image
                src={item.imgUrl}
                fill
                sizes="100%"
                alt={item.name}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <div className="w-full h-1/4 flex items-center justify-center bg-black xl:text-lg">
              {item.name}
            </div>
            <div className="w-full h-1/4 flex flex-row items-center justify-between px-4">
              <p>Stack Size:</p>
              <p>{item.stackSize}</p>
            </div>
            <div className="w-full h-1/4 flex flex-row items-center justify-between bg-dark-bg px-4">
              <p>Sink Value:</p>
              <p>{item.sinkPoints}</p>
            </div>
            <div className="w-full h-1/4 flex flex-row items-center justify-between px-4">
              <p>Radioactive:</p>
              <p>{item.isRadioactive ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 h-full sm:h-32 md:h-40 lg:h-48 relative flex items-center justify-center p-6">
          <Link href="/deprecated" className='w-full h-8 hidden absolute top-0 sm:flex items-center justify-center bg-error hover:bg-red-600'>
            <p className='text-white text-center'>Items are deprecated</p>
          </Link>
          <p>{item.description}</p>
        </div>
      </section>
      <Recipes recipes={recipes} title='Recipes' />
      <Recipes recipes={usagesAsIngredient} title='Usages as Ingredient' />
    </Main>
  )
}