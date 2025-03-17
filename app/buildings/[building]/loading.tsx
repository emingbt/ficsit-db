import Main from "../../../components/Main"

export default function Loading() {
  return (
    <Main classname="bg-dark-bg" dontFill>
      <section className="w-full flex flex-col md:flex-row items-center justify-center bg-main-bg text-xs sm:text-sm">
        <div className="w-full md:w-3/5 h-24 sm:h-32 md:h-40 lg:h-48 flex flex-row items-center justify-center">
          <div className="h-full aspect-square bg-light-bg p-2">
            <div className="w-full h-full animate-pulse bg-main-bg rounded-md"
              style={{
                animationDuration: '1s',
              }} />
          </div>
          <div className="w-full h-full flex flex-col">
            <div className="w-full h-1/2 flex items-center justify-center bg-black xl:text-lg">
              <span className="w-2/5 h-1/2 animate-pulse bg-light-bg rounded-md"
                style={{
                  animationDelay: '0.1s',
                  animationDuration: '1s',
                }} />
            </div>
            <div className="w-full flex items-center px-4 py-1 bg-main-orange">
              <p>Cost</p>
            </div>
            <div className="w-full h-full flex flex-wrap items-center justify-center px-4">
              {Array.from(Array(3).keys()).map((i) => (
                <div key={i} className="flex flex-row items-center justify-center px-1 lg:px-2">
                  <span className='w-5 h-4 mr-1 font-secondary animate-pulse bg-light-bg rounded-sm sm:rounded-md'
                    style={{
                      animationDelay: `${(i + 2) * 0.1}s`,
                      animationDuration: '1s',
                    }} />
                  <div className='h-5 sm:h-10 lg:h-12 aspect-square bg-light-bg rounded-sm sm:rounded-md p-0.5 sm:p-1 cursor-pointer'>
                    <div className='w-full h-full animate-pulse bg-main-bg rounded-sm sm:rounded-md'
                      style={{
                        animationDelay: `${(i + 2) * 0.2}s`,
                        animationDuration: '1s',
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 h-auto md:h-full flex items-center justify-center p-6">
          <span className="h-12 md:h-24 w-full animate-pulse bg-light-bg rounded-md"
            style={{
              animationDelay: '0.8s',
              animationDuration: '1s',
            }} />
        </div>
      </section>
    </Main>
  )
}