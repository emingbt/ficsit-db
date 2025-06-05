import Main from "../../components/Main"
import { getAllBlueprintsByTitle } from "../../services/blueprint"
import { getAllPioneersByName } from "../../services/pioneer"
import { getSearch } from "../../utils/gameDataFetcher"
import SearchSection from "./section"

export default async function SearchPage({ searchParams }: {
  searchParams: { name: string, category: "items" | "buildings" | "blueprints" } | undefined
}) {
  const name = searchParams?.name?.toLowerCase() || ""

  // This always fetches blueprints on every search load,
  // even when the user isn’t viewing that category.
  // Consider fetching blueprints only when blueprints cateyory
  // is selected to reduce unnecessary DB calls.
  const gameData = await getSearch(name)
  const blueprints = await getAllBlueprintsByTitle(name)
  const pioneers = await getAllPioneersByName(name)
  const data = {
    items: gameData?.items || [],
    buildings: gameData?.buildings || [],
    blueprints: blueprints || [],
    pioneers: pioneers || []
  }

  if (!data) {
    return (
      <main className="w-full h-full flex items-center justify-center bg-main-bg">
        <div className="w-full h-full flex items-center justify-center text-xl">No results found</div>
      </main>
    )
  }

  return (
    <Main classname="flex flex-col items-stretch bg-dark-bg">
      <SearchSection searchInput={name} data={data} />
    </Main>
  )
}