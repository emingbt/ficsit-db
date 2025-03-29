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
        <Link href="/deprecated" className='w-full h-6 sm:h-8 flex items-center justify-center bg-red-800 hover:bg-red-700 mb-2 sm:mb-4'>
          <p className='text-white text-center text-xs sm:text-base'>Buildings are deprecated</p>
        </Link>
        <BuildingsSection selectedCategory={selectedCategory} />
      </Main>
    </div>
  )
}