import Link from "next/link"
import BuildingCategories from "../../../components/building/buildingCategories"
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
        <Link href="/deprecated" className='w-full h-6 sm:h-8 flex items-center justify-center bg-error hover:bg-red-600 mb-2 sm:mb-4'>
          <p className='text-white text-center text-xs sm:text-base'>Buildings are deprecated</p>
        </Link>
        <BuildingsSection selectedCategory={selectedCategory} />
      </div>
    </main>
  )
}