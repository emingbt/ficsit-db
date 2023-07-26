export default function Loading() {
  return (
    <main className="w-full h-full bg-dark-bg p-2 lg:p-3">
      <div className="w-full h-16 flex flex-col items-center justify-center bg-main-bg mb-2 lg:mb-3">
        <span className="text-main-orange">Recipe:</span>
        <div className="w-36 h-6 animate-pulse bg-light-bg rounded-md"
          style={{
            animationDelay: '1s',
            animationDuration: '1s',
          }} />
      </div>
      <section className="w-full grid grid-cols-2 lg:grid-cols-7 gap-2 lg:gap-3">
        <div className="w-full flex flex-col lg:col-span-2 bg-main-bg">
          <div className="w-full h-full min-h-[16rem] sm:min-h-[24rem] flex flex-col justify-center px-2 sm:px-4">
            {Array.from(Array(2).keys()).map((i) => {
              return (
                <div className="w-full flex flex-row items-center my-2" key={i}>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 shrink-0 bg-light-bg rounded-sm sm:rounded-md p-1">
                    <div className="w-full h-full animate-pulse bg-main-bg rounded-sm sm:rounded-md"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '1s',
                      }} />
                  </div>
                  <div className="w-full h-full flex flex-col justify-center ml-2">
                    <div className="w-full sm:w-1/2 h-6 animate-pulse bg-light-bg rounded-md"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '1s',
                      }} />
                    <div className="flex flex-row items-center text-xs xl:text-base mt-1">
                      <div className="w-6 h-4 animate-pulse bg-light-bg rounded-md mr-1"
                        style={{
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: '1s',
                        }} /> per min</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="w-full text-center text-sm bg-light-bg">
            <p>INPUT</p>
          </div>
        </div>
        <div className="w-full flex flex-col lg:col-span-2 lg:order-3 bg-main-bg">
          <div className="w-full h-full min-h-[16rem] sm:min-h-[24rem] flex flex-col justify-center px-4">
            {Array.from(Array(1).keys()).map((i) => {
              return (
                <div className="w-full flex flex-row items-center my-2" key={i}>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 shrink-0 bg-light-bg rounded-sm sm:rounded-md p-1">
                    <div className="w-full h-full animate-pulse bg-main-bg rounded-sm sm:rounded-md"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '1s',
                      }} />
                  </div>
                  <div className="w-full h-full flex flex-col justify-center ml-2">
                    <div className="w-full sm:w-1/2 h-6 animate-pulse bg-light-bg rounded-md"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '1s',
                      }} />
                    <div className="flex flex-row items-center text-xs xl:text-base mt-1">
                      <div className="w-6 h-4 animate-pulse bg-light-bg rounded-md mr-1"
                        style={{
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: '1s',
                        }} /> per min</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="w-full text-center text-sm bg-light-bg">
            <p>OUTPUT</p>
          </div>
        </div>
        <div className="w-full col-span-2 lg:col-span-3 lg:order-2 bg-main-bg">
          <div className="w-full lg:min-h-[24rem] flex flex-col justify-around p-4">
            <div className="w-full h-full flex flex-row">
              <div className="w-1/2 h-full flex flex-col justify-around">
                <div className="flex flex-col items-start pr-4 mb-4">
                  <p className="text-sm sm:text-base">Clockspeed</p>
                  <div
                    className="w-full h-12 animate-pulse bg-light-bg"
                    style={{
                      animationDelay: '0s',
                      animationDuration: '1s'
                    }}
                  />
                </div>
                <div className="flex flex-col items-start pr-4 mb-4">
                  <p className="text-xs sm:text-base">Target production rate</p>
                  <div
                    className="w-full sm:w-1/2 h-12 animate-pulse bg-light-bg"
                    style={{
                      animationDelay: '0s',
                      animationDuration: '1s'
                    }}
                  />
                </div>
              </div>
              <div className="w-1/2 h-full flex flex-col justify-around">
                <div className="flex flex-col items-end mb-4">
                  <p className="text-xs">Energy Consumption</p>
                  <p className="text-lg text-dark-orange">MW</p>
                </div>
                <div className="flex flex-col items-end mb-4">
                  <p className="text-xs">Period Time</p>
                  <p className="text-lg text-dark-orange">s</p>
                </div>
                <div className="flex flex-col items-end mb-4">
                  <p className="text-xs mb-1">Required Power Shards</p>
                  <div className="flex flex-row items-center">
                    <p className="text-dark-orange">0x</p>
                    <div className="w-10 aspect-square bg-light-bg rounded-md p-0.5 ml-1">
                      <div
                        className="w-full h-full animate-pulse bg-main-bg rounded-md"
                        style={{
                          animationDelay: '0s',
                          animationDuration: '1s',
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end mb-4">
                  <p className="text-xs mb-1">Produced In</p>
                  <div className="flex flex-row items-center justify-end">
                    <div
                      className="w-16 h-4 animate-pulse bg-light-bg rounded-md"
                      style={{
                        animationDelay: '0s',
                        animationDuration: '1s',
                      }}
                    />
                    <div className="w-10 aspect-square shrink-0 bg-light-bg rounded-md p-0.5 ml-2">
                      <div
                        className="w-full h-full animate-pulse bg-main-bg rounded-md"
                        style={{
                          animationDelay: '0s',
                          animationDuration: '1s',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="range"
              className="w-full h-full accent-dark-orange"
              min={0}
              max={250}
              defaultValue={100}
            />
          </div>
          <div className="w-full text-center text-sm bg-light-bg">
            <p>OVERCLOCK</p>
          </div>
        </div>
      </section>
    </main>
  )
}