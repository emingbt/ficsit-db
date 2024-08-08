import SearchIcon from "../../assets/searchIcon.svg"

export default function Loading({ searchParams }: {
  searchParams?: { name: string } | undefined
}) {
  const name = searchParams?.name?.toLowerCase() || ""

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-end">
        <div className="w-full h-12 sm:h-8 flex lg:hidden flex-row mb-2.5">
          <div className="w-full h-full bg-main-bg lg:mb-4 px-4">
            <p>{name}</p>
          </div>
          <div className="w-12 sm:w-8 h-full flex items-center justify-center bg-main-orange lg:mb-4">
            <SearchIcon />
          </div>
        </div>
        <span className="w-full hidden lg:flex text-2xl pl-2">
          Search results for (<span className="text-main-orange"> {name}</span>)
        </span>
        <div className="flex flex-row justify-end mb-2.5 lg:mb-4">
          <button className="w-full sm:w-32 h-8  lg:ml-4 bg-main-orange">
            Items (0)
          </button>
          <button className="w-full sm:w-32 h-8 ml-2.5 lg:ml-4 bg-light-bg">
            Buildings (0)
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1 lg:gap-2 justify-center bg-light-bg p-2 lg:p-3">
        {Array.from(Array(24).keys()).map((i) => {
          return (
            <div key={i} className="flex flex-col items-center justify-center m-1 bg-main-bg hover:bg-dark-bg pointer-cursor">
              <div className='w-full aspect-square p-2'>
                <div
                  className='w-full h-full animate-pulse bg-dark-bg rounded-md'
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s',
                  }}>
                </div>
              </div>
              <div className='w-full h-16 flex items-center justify-center p-1 bg-dark-bg'>
                <div
                  className="w-4/5 h-1/3 text-center text-sm animate-pulse bg-light-bg rounded-sm"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s',
                  }}></div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}