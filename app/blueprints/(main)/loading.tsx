import Main from "../../../components/Main"
import Pagination from "../../../components/Pagination"

export default function Loading() {
  const blueprints = Array.from(Array(5).keys())

  return (
    <Main>
      <div className="w-full h-10 sm:h-12 flex items-center bg-main-bg pl-4">
        <h1 className="text-xl sm:text-2xl font-medium text-logo-blue">Blueprints</h1>
      </div>
      <section className='w-full min-h-[calc(100%-96px)] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-3 justify-center bg-light-bg p-2 lg:p-3'>
        {
          blueprints.map((_blueprint, i: number) => {
            return (
              <div key={i} className="w-full h-48 sm:h-64 lg:h-80 xl:h-60 bg-main-bg flex flex-col justify-center relative p-1 sm:p-2">
                <div className="w-full h-1/2 bg-light-bg animate-pulse" />
                <div className="w-full h-1/2 flex flex-col items-center justify-center gap-4 mt-2">
                  <div className="w-1/2 h-6 animate-pulse bg-light-bg rounded-md" />
                  <div className="w-1/4 h-6 animate-pulse bg-light-bg rounded-md" />
                </div>
                <div className='w-full h-1 bg-logo-blue absolute bottom-0 left-0' />
              </div>
            )
          })
        }
      </section>
      <Pagination path='/blueprints' currentPage={1} pageCount={1} />
    </Main>
  )
}