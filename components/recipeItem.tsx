import Image from 'next/image'
import Link from 'next/link'

import type { ProductionRecipeItem } from "../interfaces"

export default function RecipeItem({ item, perMinute }: {
  item: ProductionRecipeItem,
  perMinute: number
}) {
  return (
    <div className="flex flex-row items-center my-2">
      <Link href={`/items/${item.slug}`} className={`w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 shrink-0 bg-light-bg p-1
      ${item.isFluid ? "rounded-full" : "rounded-sm sm:rounded-md"}`}>
        <div className="w-full h-full relative">
          <Image
            src={item.imgUrl}
            alt={item.slug}
            fill
            style={{ objectFit: 'contain' }}
            sizes='50%'
          />
        </div>
      </Link>
      <div className="h-full flex flex-col justify-center ml-2">
        <p className="text-xs sm:text-base xl:text-lg">{item.amount} {item.name}</p>
        <p className="text-xs xl:text-base"><span className="text-dark-orange font-bold">{perMinute}</span> per min</p>
      </div>
    </div>
  )
}