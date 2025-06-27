import Main from "../../../components/Main"
import Pagination from "../../../components/Pagination"

export default function Loading() {
  const blueprintPacks = Array.from(Array(30).keys())

  return (
    <Main>
      <div className="w-full h-10 sm:h-12 flex items-center bg-main-bg pl-4">
        <h1 className="text-lg sm:text-xl font-medium">Blueprint Packs</h1>
      </div>
      <div className='w-full min-h-[calc(100%-48px)] bg-light-bg'>
        <section className='w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-3 p-2 lg:p-3'>
          {
            blueprintPacks.map((_blueprint, i: number) => {
              return (
                <div key={i} className="w-full bg-main-bg flex flex-col justify-center relative p-1 sm:p-2 rounded-md">
                  <div className="w-full bg-light-bg aspect-video animate-pulse rounded-sm" />
                  <div className="w-full flex flex-col items-center justify-center sm:gap-4 mt-2">
                    <div className="w-1/2 h-8 sm:h-12 animate-pulse bg-light-bg rounded-md mb-1 sm:mb-4" />
                    <div className="w-1/3 h-4 animate-pulse bg-light-bg rounded-md mb-2 sm:mb-1" />
                  </div>
                </div>
              )
            })
          }
        </section>
      </div>
      <Pagination path='/blueprint-packs' currentPage={1} pageCount={1} />
    </Main>
  )
}