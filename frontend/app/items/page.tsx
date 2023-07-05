import Link from 'next/link'
import Image from 'next/image'

import { Item } from '../../interfaces'

export default async function Items() {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000'
  const result = await fetch(`${baseUrl}/api/items`)
  const items = await result.json()

  return (
    <>
      {items.map((item: Item, i: number) => {
        return (
          <Link href={`/items/${item.slug}`} key={i}>
            <div className="flex flex-col items-center justify-center m-1 bg-main-bg hover:bg-dark-bg pointer-cursor">
              <div className='w-full aspect-square p-2'>
                <div className='w-full min-h-[5rem] h-full relative'>
                  <Image
                    src={item.imgUrl}
                    fill
                    sizes='100%'
                    alt={item.name}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className='w-full h-16 flex items-center justify-center p-1 bg-dark-bg'>
                <p className="text-center text-sm">{item.name}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </>
  )
}