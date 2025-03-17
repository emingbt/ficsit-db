import Main from "../../../components/Main"
import Pagination from "../../../components/pagination"
import BlueprintContainer from "../../../components/BlueprintContainer"
import { getPageCountAndBlueprintsByPage } from "../../../services/blueprint"

export default async function BlueprintsPage({ searchParams }: { searchParams: { page: string } | undefined }) {
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1
  const { pageCount, blueprints } = await getPageCountAndBlueprintsByPage(page)

  return (
    <Main classname="flex flex-col items-stretch">
      <BlueprintContainer blueprints={blueprints} title="Blueprints" />
      <Pagination path='/blueprints' currentPage={page} pageCount={pageCount} />
    </Main>
  )
}