import Link from "next/link"
import Image from "next/image"
import StarIcon from "../assets/starIcon.svg"
import type { BlueprintCardProps } from "../interfaces"

export default function BlueprintCard({ blueprint, isEdit }: { blueprint: BlueprintCardProps, isEdit?: boolean }) {
  return (
    <div>
      <div className="relative">
        {isEdit && blueprint.visibility && (
          <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold z-50
            ${blueprint.visibility === 'public' ? 'bg-green-600 text-white' : ''}
            ${blueprint.visibility === 'unlisted' ? 'bg-orange-500 text-white' : ''}
            ${blueprint.visibility === 'private' ? 'bg-red-600 text-white' : ''}
          `}>
            {blueprint.visibility.charAt(0).toUpperCase() + blueprint.visibility.slice(1)}
          </span>
        )}
        <Link href={`/${isEdit ? "edit-blueprint" : "blueprints"}/${blueprint.id}`}>
          <div className="flex flex-col items-center justify-center bg-main-bg lg:hover:bg-dark-bg rounded-sm sm:rounded-md cursor-pointer p-1 sm:p-2">
            <div className="w-full aspect-video">
              <div className='w-full h-full relative'>
                <Image
                  src={blueprint.images[0]}
                  fill
                  sizes='100%'
                  alt={blueprint.title}
                  style={{ objectFit: 'cover', borderRadius: '0.125rem' }}
                  unoptimized
                />
              </div>
            </div>
            <div className='w-full flex flex-col p-2 sm:p-4'>
              <div className="w-full h-10 sm:h-12 flex items-center justify-center mb-2 sm:mb-4 font-medium text-xl overflow-hidden">
                <p className="text-sm sm:text-lg text-center font-medium line-clamp-2">
                  {blueprint.title}
                </p>
              </div>
              <div className="w-full h-3 flex flex-row justify-center items-center gap-1 mb-2 sm:mb-1">
                {
                  Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      key={index}
                      //@ts-ignore
                      className={`w-3 sm:w-4 h-3 sm:h-4 text-logo-blue ${index < blueprint.averageRating ? 'fill-main-orange' : 'fill-light-bg'}`}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}