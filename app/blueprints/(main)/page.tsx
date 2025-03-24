import Main from "../../../components/Main"
import Pagination from "../../../components/Pagination"
import BlueprintContainer from "../../../components/BlueprintContainer"
import { getPageCountAndBlueprintsByPage } from "../../../services/blueprint"

import type { Blueprint } from "../../../drizzle/schema"

export default async function BlueprintsPage({ searchParams }: {
  searchParams: {
    page: string,
    category: string,
    sort: string
  } | undefined
}) {
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1
  const category = searchParams?.category as Blueprint["categories"][number] | undefined
  const sort = searchParams?.sort

  const { pageCount, blueprints } = await getPageCountAndBlueprintsByPage(page, category, sort)

  return (
    <Main classname="flex flex-col items-stretch">
      <BlueprintContainer blueprints={blueprints} title="Blueprints" filter={{ category, sort }} />
      <Pagination
        path="/blueprints"
        currentPage={page}
        pageCount={pageCount}
        filterPath={`${category ? `&category=${category}` : ""}${sort ? `&sort=${sort}` : ""}`}
      />
    </Main>
  )
}