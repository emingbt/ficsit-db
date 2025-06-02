import Main from "../../components/Main"
import { getAllBlueprintsByTitle } from "../../services/blueprint"
import { getSearch } from "../../utils/gameDataFetcher"
import SearchSection from "./section"

export default async function SearchPage({ searchParams }: {
  searchParams: { name: string, category: "items" | "buildings" | "blueprints" } | undefined
}) {
  const name = searchParams?.name?.toLowerCase() || ""

  const gameData = await getSearch(name)
  const blueprints = await getAllBlueprintsByTitle(name)
  const data = {
    items: gameData?.items || [],
    buildings: gameData?.buildings || [],
    blueprints: blueprints || []
  }

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