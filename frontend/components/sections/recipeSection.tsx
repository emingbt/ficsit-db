"use client"

import { useState } from "react"
import Image from "next/image"
import RecipeItem from "../recipeItem"

import type { ProductionRecipe } from "../../interfaces"

export default function RecipeSection({ recipe }: {
  recipe: ProductionRecipe
}) {
  const [clockspeed, setClockspeed] = useState(100)
  const [productionRate, setProductionRate] = useState(recipe.products[0].amount / recipe.craftTime * 60)

  let energyConsumption = parseFloat((recipe.building.consumption * (clockspeed / 100) ** Math.log2(2.5)).toFixed(4))
  let requiredPowerShards = clockspeed > 200 ? 3 : clockspeed > 150 ? 2 : clockspeed > 100 ? 1 : 0
  let periodTime = parseFloat((recipe.craftTime * 100 / clockspeed).toFixed(4))

  const handleClockspeed = (value: string) => {
    const clockspeed = parseInt(value)
    setClockspeed(clockspeed)
    setProductionRate((recipe.products[0].amount / recipe.craftTime * 60) * clockspeed / 100)
  }

  const handleProductionRate = (value: string) => {
    const productionRate = parseInt(value)
    setProductionRate(productionRate)
    setClockspeed(productionRate / (recipe.products[0].amount / recipe.craftTime * 60) * 100)
  }

  return (
    <section className="w-full grid grid-cols-2 lg:grid-cols-7 gap-2 lg:gap-3">
      <div className="w-full flex flex-col lg:col-span-2 bg-main-bg">
        <div className="w-full h-full min-h-[16rem] sm:min-h-[24rem] flex flex-col justify-center px-2 sm:px-4">
          {recipe.ingredients.map((ingredient, index) => {
            const perMinute = parseFloat((ingredient.amount * 60 / recipe.craftTime * clockspeed / 100).toFixed(4))

            return (
              <RecipeItem key={index} item={ingredient} perMinute={perMinute} />
            )
          })}
        </div>
        <div className="w-full text-center text-sm bg-light-bg">
          <p>INPUT</p>
        </div>
      </div>
      <div className="w-full flex flex-col lg:col-span-2 lg:order-3 bg-main-bg">
        <div className="w-full h-full min-h-[16rem] sm:min-h-[24rem] flex flex-col justify-center px-4">
          {recipe.products.map((product, index) => {
            const perMinute = parseFloat((product.amount * 60 / recipe.craftTime * clockspeed / 100).toFixed(4))

            return (
              <RecipeItem key={index} item={product} perMinute={perMinute} />
            )
          })}
        </div>
        <div className="w-full text-center text-sm bg-light-bg">
          <p>OUTPUT</p>
        </div>
      </div>
      <div className="w-full col-span-2 lg:col-span-3 lg:order-2 bg-main-bg">
        <div className="w-full lg:min-h-[24rem] flex flex-col justify-around p-4">
          <div className="w-full h-full flex flex-row">
            <div className="w-1/2 h-full flex flex-col justify-around">
              <div className="flex flex-col items-start pr-4 mb-4">
                <p className="text-sm sm:text-base">Clockspeed</p>
                <input
                  type="number"
                  className="w-full h-12 bg-light-bg text-2xl text-dark-orange pl-4 outline-none"
                  max={250}
                  value={clockspeed}
                  onChange={e => handleClockspeed(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start pr-4 mb-4">
                <p className="text-xs sm:text-base">Target production rate</p>
                <input
                  type="number"
                  className="w-full sm:w-1/2 h-12 bg-light-bg text-2xl text-dark-orange pl-4 outline-none"
                  value={productionRate}
                  onChange={e => handleProductionRate(e.target.value)}
                />
              </div>
            </div>
            <div className="w-1/2 h-full flex flex-col justify-around">
              <div className="flex flex-col items-end mb-4">
                <p className="text-xs">Energy Consumption</p>
                <p className="text-lg text-dark-orange">{energyConsumption} MW</p>
              </div>
              <div className="flex flex-col items-end mb-4">
                <p className="text-xs">Period Time</p>
                <p className="text-lg text-dark-orange">{periodTime} s</p>
              </div>
              <div className="flex flex-col items-end mb-4">
                <p className="text-xs mb-1">Required Power Shards</p>
                <div className="flex flex-row items-center">
                  <p className="text-dark-orange">{requiredPowerShards}x</p>
                  <div className="w-10 aspect-square bg-light-bg rounded-md p-0.5 ml-1">
                    <div className="w-full h-full relative">
                      <Image
                        src="https://res.cloudinary.com/ficsitdb/image/upload/v1679492896/Items%20%7C%20FICSIT%20DB/power-shard_bty5zo.png"
                        alt="power-shard"
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="50%"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end mb-4">
                <p className="text-xs mb-1">Produced In</p>
                <div className="flex flex-row items-center">
                  <p className="text-end text-dark-orange text-sm sm:text-base">{recipe.building.name}</p>
                  <div className="w-10 aspect-square shrink-0 bg-light-bg rounded-md p-0.5 ml-2">
                    <div className="w-full h-full relative">
                      <Image
                        src={recipe.building.imgUrl}
                        alt={recipe.building.slug}
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="50%"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input
            type="range"
            className="w-full h-full accent-dark-orange"
            min={0}
            max={250}
            step={25}
            value={clockspeed}
            onChange={e => handleClockspeed(e.target.value)}
          />
        </div>
        <div className="w-full text-center text-sm bg-light-bg">
          <p>OVERCLOCK</p>
        </div>
      </div>
    </section>
  )
}