"use client"

import { useEffect, useState } from "react"
import StarIcon from "../../../assets/starIcon.svg"
import { rateBlueprint, checkIfRated } from "./action"

export default function RatingBlueprint({ blueprintId, pioneerName }: { blueprintId: number, pioneerName: string | undefined }) {
  const [rating, setRating] = useState(0)
  const [isRated, setIsRated] = useState(false)

  useEffect(() => {
    const fetchRating = async () => {
      if (!pioneerName) {
        return
      }

      const rating = await checkIfRated(blueprintId, pioneerName)
      if (rating) {
        setRating(rating)
        setIsRated(true)
      }
    }

    fetchRating()
  }, [blueprintId, pioneerName])

  const handleOnClick = async (rating: number) => {
    if (!pioneerName) {
      return
    }

    setRating(rating)
    setIsRated(true)

    await rateBlueprint(blueprintId, pioneerName, rating)
  }

  return (
    <div className="w-full h-24 sm:h-36 lg:h-24 xl:h-36 flex flex-col items-center justify-center gap-1 xl:gap-2 bg-main-bg">
      {isRated ?
        <h3 className="xl:text-xl font-semibold text-main-orange text-center">
          You gave <br className="hidden lg:block " /> {rating} Stars!
        </h3> :
        pioneerName ?
          <h3 className="xl:text-xl font-semibold text-main-orange text-center">
            Rate this <br className="hidden lg:block " /> Blueprint!
          </h3> :
          <h3 className="xl:text-xl font-semibold text-main-orange text-center">
            Login to <br className="hidden lg:block " /> rate Blueprint!
          </h3>
      }
      <div className="flex flex-row gap-2">
        {
          Array.from({ length: 5 }).map((_, index) => (
            <button key={index} onClick={() => {
              handleOnClick(index + 1)
            }}>
              <StarIcon
                className={`w-6 h-6 lg:w-5 lg:h-5 text-logo-blue ${index < rating ? 'fill-main-orange' : 'fill-light-bg'}`}
              />
            </button>
          ))
        }
      </div>
    </div>
  )
}