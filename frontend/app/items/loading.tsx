export default function Loading() {
  return (
    <>
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
    </>
  )
}