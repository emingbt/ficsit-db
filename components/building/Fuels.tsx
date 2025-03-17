import Image from 'next/image'

import type { Building } from "../../interfaces"

export default function Fuels({ fuels }: {
  fuels: Building['fuels']
}) {
  // if there are no fuels, return null
  if (!fuels || fuels.length == 0) return null

  // arrange fuels' items by their type
  // FUEL_OF first, then SUPPLEMENT_OF and then PRODUCT_OF
  fuels.forEach(fuel => {
    fuel.items.sort((a, b) => {
      if (a.type === 'FUEL_OF' && b.type !== 'FUEL_OF') return -1
      if (a.type !== 'FUEL_OF' && b.type === 'FUEL_OF') return 1
      if (a.type === 'SUPPLEMENT_OF' && b.type === 'PRODUCT_OF') return -1
      if (a.type === 'PRODUCT_OF' && b.type === 'SUPPLEMENT_OF') return 1
      return 0
    })
  })

  return (
    <section className={`w-full flex flex-col mt-4`}>
      <div className="w-full h-12 flex items-center px-4 bg-main-bg">
        <h1>Fuels - ({fuels.length})</h1>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 bg-light-bg">
        {fuels.map((fuel, i) => (
          <div key={i}>
            <div className="w-full h-16 sm:h-24 flex flex-row items-center justify-center bg-main-bg p-1 sm:p-2">
              {fuel.items.map((item, j) => (
                <div className='h-full flex flex-row items-center' key={j}>
                  {item.type === 'PRODUCT_OF' && <div className='w-0.5 h-full sm:h-full bg-main-orange ml-1 sm:ml-2' />}
                  <p className='text-xs sm:text-base ml-2'>{parseFloat(item.rate.toFixed(4))}x</p>
                  <div className={`h-8 sm:h-14 aspect-square p-0.5 sm:p-1 m-1 sm:m-2 bg-light-bg
                  ${item.isFluid ? 'rounded-full' : 'rounded-sm sm:rounded-md'}`}>
                    <div className='w-full h-full relative'>
                      <Image
                        src={item.imgUrl}
                        fill
                        sizes="100%"
                        alt={item.slug}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='w-full h-12 sm:h-12 flex items-center justify-center p-2 sm:p-4 bg-dark-bg text-sm sm:text-base'>
              {fuel.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}