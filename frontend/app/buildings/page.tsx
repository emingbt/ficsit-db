import BuildingCategories from "../../components/building/buildingCategories"
import BuildingsSection from "./section"

export default async function BuildingsPage({
  searchParams
}: {
  searchParams: { category: string } | undefined
}) {
  const selectedCategory = searchParams?.category || "production"

  return (
    <main className="w-full h-full flex flex-col items-center justify-center p-2">
      <BuildingCategories selectedCategory={selectedCategory} />
      <div className="w-full bg-dark-bg p-2 sm:p-4 mt-7 xl:mt-5">
        <BuildingsSection selectedCategory={selectedCategory} />
      </div>
    </main>
  )
}