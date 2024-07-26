import Image from "next/image"
import { getItem } from "../../../utils/gameDataFetcher"
import Recipes from "../../../components/recipes"

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
    <main className="w-full h-full bg-dark-bg p-[10px] lg:p-4">
      <div className="w-full h-full flex flex-col items-center justify-center">
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
          <div className="w-full md:w-2/5 h-auto md:h-full flex items-center justify-center p-6">
            <p>{item.description}</p>
          </div>
        </section>
        <Recipes recipes={recipes} title='Recipes' />
        <Recipes recipes={usagesAsIngredient} title='Usages as Ingredient' />
      </div>
    </main>
  )
}