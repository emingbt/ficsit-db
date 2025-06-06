import Image from 'next/image'
import Link from 'next/link'

import type { ProductionRecipe } from "../interfaces"

export default function Recipes({ recipes, title = 'Recipes' }: { recipes: ProductionRecipe[], title?: string }) {
  if (!recipes || recipes.length == 0) return null

  return (
    <section className={`w-full flex flex-col mt-2 lg:mt-4`}>
      <div className="w-full h-12 flex items-center px-4 bg-main-bg">
        <h1>{title} - ({recipes.length})</h1>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4 bg-light-bg">
        {recipes.map((recipe, i) => (
          <Link href={`/recipes/${recipe.slug}`}
            className="w-full flex flex-col bg-dark-bg lg:hover:bg-main-bg cursor-pointer"
            key={i}
          >
            <div className="w-full flex flex-wrap items-center justify-center py-2">
              {recipe.products.map((product, j) => (
                <div className={`h-10 sm:h-16 aspect-square p-0.5 sm:p-1 m-1 sm:m-2 bg-light-bg
                ${product.isFluid ? 'rounded-full' : 'rounded-sm sm:rounded-md'}`} key={j}>
                  <div className='w-full h-full relative'>
                    <Image
                      alt={product.name}
                      src={product.imgUrl}
                      fill
                      sizes="100%"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))
              }
            </div>
            <div className="w-full px-4">
              <div className='w-full h-0.5 bg-main-orange' />
            </div>
            <div className="w-full flex flex-wrap items-center justify-center py-4">
              {recipe.ingredients.map((ingredient, j) => (
                <div className={`h-10 sm:h-16 aspect-square p-0.5 sm:p-1 m-1 sm:m-2 bg-light-bg
                ${ingredient.isFluid ? 'rounded-full' : 'rounded-sm sm:rounded-md'}`} key={j}>
                  <div className='w-full h-full relative'>
                    <Image
                      alt={ingredient.name}
                      src={ingredient.imgUrl}
                      fill
                      sizes="100%"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))
              }
            </div>
            <div className='w-full h-full flex items-end'>
              <div className='w-full h-12 sm:h-20 flex items-center justify-center p-2 sm:p-4 bg-main-bg text-xs sm:text-base text-gray-200 font-secondary'>
                {recipe.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
