import Link from "next/link"
import { getRecipe } from "../../../utils/gameDataFetcher"
import RecipeSection from "./section"

export default async function RecipePage({ params }: {
  params: { recipe: string }
}) {
  const recipeSlug = params.recipe
  const recipe = await getRecipe(recipeSlug)

  if (!recipe) {
    return (
      <main className="w-full h-full flex items-center justify-center bg-main-bg">
        <p className="text-xl">Recipe not found</p>
      </main>
    )
  }

  return (
    <main className="w-full h-full bg-dark-bg p-2 lg:p-3">
      <div className="w-full h-16 flex flex-col items-center justify-center bg-main-bg mb-2 lg:mb-3">
        <span className="text-main-orange">Recipe:</span>
        <h1 className="text-white text-xl ml-2">{recipe.name}</h1>
      </div>
      <Link href="/deprecated" className='w-full h-6 sm:h-8 flex items-center justify-center bg-error hover:bg-red-600 mb-2 lg:mb-3'>
        <p className='text-white text-center text-xs sm:text-base'>Recipes are deprecated</p>
      </Link>
      <RecipeSection recipe={recipe} />
    </main>
  )
}