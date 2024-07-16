export default function Loading() {
  return (
    <section className='w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1 lg:gap-2 justify-center bg-light-bg p-1 lg:p-3'>
      {Array.from(Array(32).keys()).map((i) => {
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
    </section>
  )
}