export default async function RecipePage({ params }: {
  params: { recipe: string }
}) {
  const recipeSlug = params.recipe

  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000'
  const result = await fetch(`${baseUrl}/api/recipes/${recipeSlug}`, { cache: 'no-store' })
  const recipe = await result.json()

  return (
    <main>
      <h1>{recipe.title}</h1>
    </main>
  )
}