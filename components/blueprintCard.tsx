import Link from "next/link"
import Image from "next/image"
import StarIcon from "../assets/starIcon.svg"

type Card = {
  title: string
  images: string[]
}

export default function BlueprintCard({ blueprint }: { blueprint: Card }) {
  return (
    <Link href={`/blueprints/${blueprint.title}`}>
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
            <StarIcon className="w-3 sm:w-5 h-3 sm:h-5" />
            <StarIcon className="w-3 sm:w-5 h-3 sm:h-5" />
            <StarIcon className="w-3 sm:w-5 h-3 sm:h-5" />
            <StarIcon className="w-3 sm:w-5 h-3 sm:h-5" />
            <StarIcon className="w-3 sm:w-5 h-3 sm:h-5" />
          </div>
        </div>
        <div className='w-full h-1 sm:h-2 bg-logo-blue' />
      </div>
    </Link>
  )
}