import Link from "next/link"
import Image from "next/image"
import StarIcon from "../assets/starIcon.svg"

import type { Blueprint } from "../drizzle/schema"

export default function BlueprintCard({ blueprint }: { blueprint: Blueprint }) {
  return (
    <Link href={`/blueprints/${blueprint.id}`}>
      <div className="flex flex-col items-center justify-center bg-dark-bg lg:hover:bg-main-bg cursor-pointer">
        <div className='w-full h-20 sm:h-40 relative'>
          <Image
            src={blueprint.images[0]}
            fill
            sizes='100%'
            alt={blueprint.title}
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
        <div className='w-full flex flex-col p-2 sm:p-4'>
          <div className="w-full h-14 sm:h-20 mb-4 font-medium text-xl">
            <p className='text-sm sm:text-lg text-center font-medium'>{blueprint.title}</p>
          </div>
          <div className="w-full h-3 flex flex-row justify-center items-center gap-1">
            {
              Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  //@ts-ignore
                  className={`w-4 h-4 text-logo-blue ${index < blueprint.averageRating ? 'fill-main-orange' : 'fill-light-bg'}`}
                />
              ))
            }
          </div>
        </div>
        <div className='w-full h-1 sm:h-2 bg-logo-blue' />
      </div>
    </Link>
  )
}