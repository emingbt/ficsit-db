import { getPageCountAndBlueprintsByPage } from "../../services/blueprint"
import BlueprintCard from "../../components/blueprintCard"
import Pagination from "../../components/pagination"

export default async function BlueprintsPage({ searchParams }: { searchParams: { page: string } | undefined }) {
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1
  const { pageCount, blueprints } = await getPageCountAndBlueprintsByPage(page)

  return (
    <main className="w-full h-full bg-dark-bg p-[10px] lg:p-4">
      <div className="w-full h-10 sm:h-12 flex items-center bg-logo-blue pl-4">
        <h1 className="text-xl sm:text-2xl font-medium text-white">Blueprints</h1>
      </div>
      <section className='w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-4 justify-center bg-light-bg p-2 lg:p-4 mb-[10px] lg:mb-4'>
        {
          blueprints?.length > 0 ?
            blueprints.map((blueprint, i: number) => {
              return (
                <BlueprintCard key={i} blueprint={blueprint} />
              )
            }) :
            <p className='text-2xl'>No blueprints found</p>
        }
      </section>
      <Pagination path='/blueprints' currentPage={page} pageCount={pageCount} />
    </main>
  )
}