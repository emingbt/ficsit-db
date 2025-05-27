import Link from "next/link"
import BuildingCategories from "../../../components/building/BuildingCategories"
import BuildingsSection from "./section"
import Main from "../../../components/Main"

export default async function BuildingsPage({
  searchParams
}: {
  searchParams: { category: string } | undefined
}) {
  const selectedCategory = searchParams?.category || "production"

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <BuildingCategories selectedCategory={selectedCategory} />
      <Main classname="bg-dark-bg" dontFill>
        <BuildingsSection selectedCategory={selectedCategory} />
      </Main>
    </div>
  )
}