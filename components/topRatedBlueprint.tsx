import Link from "next/link"
import Image from "next/image"
import { getTopRatedBlueprintOfWeek } from "../services/rating"

export default async function TopRatedBlueprintOfWeek() {
  const blueprint = await getTopRatedBlueprintOfWeek()

  return (
    <section className="w-full sm:w-5/12 h-72 sm:h-full flex flex-col bg-main-bg">
      <div className="w-full bg-main-orange p-1 lg:p-2">
        <h2 className="text-base sm:text-sm md:text-base lg:text-lg text-center">Top Rated Blueprint of the Week</h2>
      </div>
      <Link href={`/blueprints/${blueprint?.id}`} className="w-full h-full flex flex-col p-4">
        <div className="w-full h-full relative mb-4 bg-black">
          <Image
            src={blueprint?.images[0] || "/images/blueprint.webp"}
            alt="blueprint"
            fill
            className="object-cover object-center"
          />
          <div className="w-full absolute bottom-0 bg-light-bg p-1">
            <p className="text-center">{blueprint?.title}</p>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-row items-center gap-3">
            <div className={`w-8 lg:w-12 h-8 lg:h-12 relative rounded-full overflow-hidden bg-avatar-${blueprint?.pioneerAvatarColor}`}>
              <Image
                src={`/images/avatars/${blueprint?.pioneerAvatar}.png`}
                alt="pioneer-avatar"
                fill
                className="object-cover object-center"
              />
            </div>
            <p className="lg:text-lg">{blueprint?.pioneerName}</p>
          </div>

        </div>
      </Link>
    </section>
  )
}