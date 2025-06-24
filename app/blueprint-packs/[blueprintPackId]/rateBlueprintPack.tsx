"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { rateBlueprintPack, checkIfRated } from "./action"

export default function RatingBlueprintPack({ blueprintPackId, pioneerName }: { blueprintPackId: number, pioneerName: string | undefined }) {
  const [rating, setRating] = useState(0)
  const [isRated, setIsRated] = useState(false)

  useEffect(() => {
    const fetchRating = async () => {
      if (!pioneerName) {
        return
      }

      const rating = await checkIfRated(blueprintPackId, pioneerName)
      if (rating) {
        setRating(rating)
        setIsRated(true)
      }
    }

    fetchRating()
  }, [blueprintPackId, pioneerName])

  const handleOnClick = async (rating: number) => {
    if (!pioneerName) {
      return
    }

    setRating(rating)
    setIsRated(true)

    await rateBlueprintPack(blueprintPackId, pioneerName, rating)
  }

  return (
    <div className="w-full h-24 sm:h-36 lg:h-24 xl:h-36 flex flex-col items-center justify-center gap-1 xl:gap-2 bg-main-bg">
      {isRated ?
        <h3 className="xl:text-xl font-semibold text-main-orange text-center">
          You gave {rating} Stars!
        </h3> :
        pioneerName ?
          <h3 className="xl:text-xl font-semibold text-main-orange text-center">
            Rate this Blueprint Pack!
          </h3> :
          <h3 className="xl:text-xl font-semibold text-main-orange text-center">
            Login to rate Blueprint Pack!
          </h3>
      }
      <div className="flex flex-row gap-2">
        {
          Array.from({ length: 5 }).map((_, index) => (
            <button key={index} onClick={() => {
              // handleOnClick(index + 1)
            }}>
              <Star
                color={index < rating ? 'bg-main-orange' : 'bg-dark-bg'}
                stroke="#D79845"
                strokeWidth={0.5}
                className={`w-5 h-5 sm:w-6 sm:h-6 ${index < rating ? 'fill-main-orange' : 'fill-dark-bg'}`}
              />
            </button>
          ))
        }
      </div>
    </div>
  )
}