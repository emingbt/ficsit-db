import Link from "next/link"
import { getRecipe } from "../../../utils/gameDataFetcher"
import RecipeSection from "./section"
import Main from "../../../components/Main"

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
    <Main classname="bg-dark-bg">
      <div className="w-full h-16 flex flex-col items-center justify-center bg-main-bg mb-2 lg:mb-4">
        <span className="text-main-orange">Recipe:</span>
        <h1 className="text-white text-xl ml-2">{recipe.name}</h1>
      </div>
      <RecipeSection recipe={recipe} />
    </Main>
  )
}