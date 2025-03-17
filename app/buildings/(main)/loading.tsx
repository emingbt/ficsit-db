import Link from "next/link"
import Main from "../../../components/Main"
import BuildingCategories from "../../../components/building/buildingCategories"

export default function Loading({ searchParams }: { searchParams?: { category: string } | undefined }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <BuildingCategories selectedCategory={searchParams?.category || ''} />
      <Main classname="bg-dark-bg" dontFill>
        <Link href="/deprecated" className='w-full h-6 sm:h-8 flex items-center justify-center bg-error hover:bg-red-600 mb-2 sm:mb-4'>
          <p className='text-white text-center text-xs sm:text-base'>Buildings are deprecated</p>
        </Link>
        <section className="w-full h-full flex flex-col items-center justify-center bg-main-bg">
          {Array.from(Array(4).keys()).map((i: number) => {
            return (
              <div className="w-full flex flex-col" key={i}>
                <div className="w-full bg-main-bg p-2 pl-4">
                  <div className="w-36 h-5 animate-pulse bg-light-bg rounded-md"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '1s',
                    }} />
                </div>
                <div className="w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 p-2 bg-light-bg">
                  {Array.from(Array(6).keys()).map((j: number) => {
                    return (
                      <div className="w-full flex flex-col bg-main-bg hover:bg-dark-bg cursor-pointer" key={j}>
                        <div className="w-full flex items-center justify-center p-1 sm:p-2 xl:p-3">
                          <div className="w-full aspect-square animate-pulse bg-light-bg"
                            style={{
                              animationDelay: `${j * 0.1}s`,
                              animationDuration: '1s',
                            }} />
                        </div>
                        <div className="h-full flex items-center justify-center p-2 bg-dark-bg text-xs lg:text-base">
                          <div className="w-2/3 h-4 bg-light-bg animate-pulse rounded-md"
                            style={{
                              animationDelay: `${i * 0.1}s`,
                              animationDuration: '1s',
                            }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>
      </Main>
    </div>
  )
}