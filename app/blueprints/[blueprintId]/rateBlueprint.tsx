"use client"

import { useEffect, useState } from "react"
import StarIcon from "../../../assets/starIcon.svg"
import { rateBlueprint, checkIfRated } from "./action"

export default function RatingBlueprint({ blueprintId, pioneerName, averageRating }: { blueprintId: number, pioneerName: string, averageRating: number }) {
  const [rating, setRating] = useState(averageRating)
  const [isRated, setIsRated] = useState(false)

  useEffect(() => {
    const fetchRating = async () => {
      const isRated = await checkIfRated(blueprintId, pioneerName)
      setIsRated(isRated)
    }

    fetchRating()
  }, [blueprintId, pioneerName])

  const handleOnClick = async (rating: number) => {
    setRating(rating)

    await rateBlueprint(blueprintId, pioneerName, rating)
  }

  return (
    <div className="w-full h-24 sm:h-36 lg:h-24 xl:h-36 flex flex-col items-center justify-center gap-1 xl:gap-2 bg-main-bg">
      {isRated ?
        <h3 className="xl:text-xl font-semibold text-main-orange text-center">
          {averageRating.toFixed(1)}
        </h3> :
        <h3 className="xl:text-xl font-semibold text-main-orange text-center">
          Rate this <br className="hidden lg:block " /> Blueprint!
        </h3>
      }
      <div className="flex flex-row gap-2">
        {
          Array.from({ length: 5 }).map((_, index) => (
            <button key={index} onClick={() => {
              handleOnClick(index + 1)
              setIsRated(true)
            }}>
              <StarIcon
                className={`w-6 h-6 lg:w-5 lg:h-5 text-logo-blue ${index < rating ? 'fill-main-orange' : 'fill-light-bg'}`}
              >
                test
              </StarIcon>
            </button>
          ))
        }
      </div>
    </div>
  )
}