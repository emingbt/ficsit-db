export default function Loading() {
  return (
    <main className="w-full h-full bg-dark-bg p-[10px] lg:p-4">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <section className="w-full flex flex-col md:flex-row items-center justify-center bg-main-bg text-xs sm:text-sm">
          <div className="w-full md:w-3/5 h-24 sm:h-32 md:h-40 lg:h-48 flex flex-row items-center justify-center">
            <div className="h-full aspect-square bg-light-bg p-2 md:p-4">
              <div className="w-full h-full animate-pulse bg-main-bg rounded-md"
                style={{
                  animationDelay: '0s',
                  animationDuration: '1s',
                }} />
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-1/4 flex items-center justify-center bg-black xl:text-lg">
                <span className="h-4 w-1/2 animate-pulse bg-light-bg rounded-md"
                  style={{
                    animationDelay: '0.1s',
                    animationDuration: '1s',
                  }} />
              </div>
              <div className="w-full h-1/4 flex flex-row items-center justify-between px-4">
                <span className="h-4 w-20 animate-pulse bg-light-bg rounded-md"
                  style={{
                    animationDelay: '0.2s',
                    animationDuration: '1s',
                  }} />
                <span className="h-4 w-6 animate-pulse bg-light-bg rounded-md"
                  style={{
                    animationDelay: '0.3s',
                    animationDuration: '1s',
                  }} />
              </div>
              <div className="w-full h-1/4 flex flex-row items-center justify-between bg-dark-bg px-4">
                <span className="h-4 w-20 animate-pulse bg-light-bg rounded-md"
                  style={{
                    animationDelay: '0.4s',
                    animationDuration: '1s',
                  }} />
                <span className="h-4 w-6 animate-pulse bg-light-bg rounded-md"
                  style={{
                    animationDelay: '0.5s',
                    animationDuration: '1s',
                  }} />
              </div>
              <div className="w-full h-1/4 flex flex-row items-center justify-between px-4">
                <span className="h-4 w-20 animate-pulse bg-light-bg rounded-md"
                  style={{
                    animationDelay: '0.6s',
                    animationDuration: '1s',
                  }} />
                <span className="h-4 w-6 animate-pulse bg-light-bg rounded-md"
                  style={{
                    animationDelay: '0.7s',
                    animationDuration: '1s',
                  }} />
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
      </div>
    </main>
  )
}