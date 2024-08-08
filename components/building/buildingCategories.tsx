import Image from 'next/image'
import Link from 'next/link'

export default function BuildingCategories({ selectedCategory = undefined }: { selectedCategory: string | undefined }) {
  const BuildingCategories = [
    'Special',
    'Production',
    'Power',
    'Logistics',
    'Organisation',
    'Transportation',
    'Foundations',
    'Walls',
    'Architecture'
  ]

  return (
    <nav className="w-full max-w-5xl grid grid-cols-3 sm:grid-cols-9 gap-1 items-center justify-center bg-dark-bg p-2">
      {BuildingCategories.map((category, i) => {
        return (
          <Link href={`/buildings?category=${category.toLowerCase()}`} key={i}
            className="w-full min-h-[6rem] sm:min-h-[1rem] flex items-center justify-center bg-main-bg aspect-square">
            <div className={`w-full max-w-[8rem] h-full flex flex-col
                  items-center justify-between p-2 bg-main-bg lg:hover:bg-dark-bg cursor-pointer
                  ${category.toLowerCase() == selectedCategory && 'text-main-orange'}`}>
              <div className="w-full h-full flex items-center justify-center relative m-3 sm:m-1">
                <Image
                  src={`/icons/ResIcon_${category}.png`}
                  alt={category}
                  fill
                  sizes='100%'
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className="text-xs sm:text-[0.5rem] lg:text-xs">{category}</p>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}