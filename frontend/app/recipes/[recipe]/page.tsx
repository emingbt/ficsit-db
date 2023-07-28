import RecipeSection from "../../../components/sections/recipeSection"

import type { ProductionRecipe } from "../../../interfaces"

export default async function RecipePage({ params }: {
  params: { recipe: string }
}) {
  const recipeSlug = params.recipe

  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000'
  const result = await fetch(`${baseUrl}/api/recipe?slug=${recipeSlug}`, { cache: 'no-store' })
  const recipe: ProductionRecipe = await result.json()

  return (
    <main className="w-full h-full bg-dark-bg p-2 lg:p-3">
      <div className="w-full h-16 flex flex-col items-center justify-center bg-main-bg mb-2 lg:mb-3">
        <span className="text-main-orange">Recipe:</span>
        <h1 className="text-white text-xl ml-2">{recipe.name}</h1>
      </div>
      <RecipeSection recipe={recipe} />
    </main>
  )
}