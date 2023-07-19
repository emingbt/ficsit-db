import Link from "next/link"
import Image from "next/image"

import type { Item, BuildingType } from "../interfaces"

// Actually, this is a card for item but can be used for building too
export const ItemCard = ({ item }: { item: Item | BuildingType }) => {
  return (
    <Link href={`/items/${item.slug}`}>
      <div className="flex flex-col items-center justify-center m-1 bg-main-bg lg:hover:bg-dark-bg pointer-cursor">
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
}