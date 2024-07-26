import { getSearch } from "../../utils/gameDataFetcher"
import SearchSection from "../../components/sections/searchSection"

export default async function SearchPage({ searchParams }: {
  searchParams: { name: string, category: "items" | "buildings" } | undefined
}) {
  const name = searchParams?.name?.toLowerCase() || ""

  const data = await getSearch(name)

  if (!data) {
    return (
      <main className="w-full h-full flex items-center justify-center bg-main-bg">
        <p className="text-xl">No results found</p>
      </main>
    )
  }

  return (
    <SearchSection data={data} />
  )
}