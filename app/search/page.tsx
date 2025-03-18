import Main from "../../components/Main"
import { getSearch } from "../../utils/gameDataFetcher"
import SearchSection from "./section"

export default async function SearchPage({ searchParams }: {
  searchParams: { name: string, category: "items" | "buildings" } | undefined
}) {
  const name = searchParams?.name?.toLowerCase() || ""

  const data = await getSearch(name)

  if (!data) {
    return (
      <main className="w-full h-full flex items-center justify-center bg-main-bg">
        <div className="w-full h-full flex items-center justify-center text-xl">No results found</div>
      </main>
    )
  }

  return (
    <Main classname="bg-dark-bg">
      <SearchSection searchInput={name} data={data} />
    </Main>
  )
}