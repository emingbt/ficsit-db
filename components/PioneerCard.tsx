import Link from "next/link"
import Image from "next/image"

export default function PioneerCard({ pioneer }: {
  pioneer: {
    name: string
    avatar: string
    color: string
    blueprints?: number
    downloads?: number
  }
}) {
  return (
    <Link href={`/pioneers/${pioneer.name}`} className="w-full h-full flex flex-col items-center justify-center bg-main-bg p-4 rounded-md shadow-md hover:bg-dark-bg">
      <div className={`w-16 h-16 relative flex items-center justify-center`}>
        <Image
          src={`/images/avatars/${pioneer.avatar}.png`}
          alt={pioneer.name}
          fill
          sizes="80%"
          className={`rounded-full bg-avatar-${pioneer.color}`}
        />
      </div>
      <h2 className="text-sm sm:text-base lg:text-lg font-semibold">{pioneer.name}</h2>
      {pioneer.blueprints && (<p className="text-xs sm:text-sm text-gray-200">Blueprints: {pioneer.blueprints}</p>)}
      {pioneer.downloads && (<p className="text-xs sm:text-sm text-gray-200">Downloads: {pioneer.downloads}</p>)}
    </Link>
  )
}