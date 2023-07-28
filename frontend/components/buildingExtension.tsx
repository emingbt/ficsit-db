"use client"

import { useState } from "react"

import type { Building } from "../interfaces"

export default function BuildingExtension({ building }: { building: Building }) {
  const [clockspeed, setClockspeed] = useState<number>(100)
  const [purity, setPurity] = useState<'Impure' | 'Normal' | 'Pure'>('Normal')
  const purityMultiplier = purity == 'Impure' ? 0.5 : purity == 'Normal' ? 1 : 2

  let powerConsumption = parseFloat(((building?.powerConsumption ?? 0) * (clockspeed / 100) ** Math.log2(2.5)).toFixed(4))
  let powerProduction = parseFloat(((building?.powerProduction ?? 0) * (clockspeed / 100)).toFixed(4))
  let resourceExtractSpeed = parseFloat(((building?.resourceExtractSpeed ?? 0) * purityMultiplier * (clockspeed / 100)).toFixed(4))

  return (
    <>
      {building.isOverclockable && (
        <section className="w-full sm:h-12 flex flex-col sm:flex-row items-center bg-light-bg">
          <div className="w-full sm:w-32 md:w-40 lg:w-48 h-10 sm:h-full shrink-0 flex flex-row items-center justify-center bg-dark-gray">
            <p className='text-sm lg:text-base'>{powerConsumption || powerProduction} MW</p>
            {building.isDependsPurity && (
              <div className='h-full flex sm:hidden flex-row items-center text-sm'>
                <div className='w-0.5 h-4/5 sm:h-full bg-main-orange mx-4' />
                <p>{resourceExtractSpeed}/min</p>
              </div>
            )}
          </div>
          <div className='w-full h-10 sm:h-full flex flex-row items-center justify-center bg-light-bg'>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setClockspeed(50)}>
              <p className={`text-sm text-main-${clockspeed == 50 ? 'orange' : 'gray'}`}>
                %50
              </p>
            </button>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setClockspeed(100)}>
              <p className={`text-sm text-main-${clockspeed == 100 ? 'orange' : 'gray'}`}>
                %100
              </p>
            </button>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setClockspeed(150)}>
              <p className={`text-sm text-main-${clockspeed == 150 ? 'orange' : 'gray'}`}>
                %150
              </p>
            </button>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setClockspeed(200)}>
              <p className={`text-sm text-main-${clockspeed == 200 ? 'orange' : 'gray'}`}>
                %200
              </p>
            </button>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setClockspeed(250)}>
              <p className={`text-sm text-main-${clockspeed == 250 ? 'orange' : 'gray'}`}>
                %250
              </p>
            </button>
          </div>
        </section>
      )}
      {building.isDependsPurity && (
        <section className='w-full h-10 sm:h-12 flex flex-row bg-dark-gray'>
          <div className='hidden sm:w-32 md:w-40 lg:w-48 h-full sm:flex shrink-0 items-center justify-center bg-light-bg'>
            <p className='text-sm lg:text-base'>{resourceExtractSpeed}/min</p>
          </div>
          <div className='w-full h-10 sm:h-full flex flex-row items-center justify-center'>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setPurity('Impure')}>
              <p className={`text-sm text-main-${purity == 'Impure' ? 'orange' : 'gray'}`}>Impure</p>
            </button>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setPurity('Normal')}>
              <p className={`text-sm text-main-${purity == 'Normal' ? 'orange' : 'gray'}`}>Normal</p>
            </button>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setPurity('Pure')}>
              <p className={`text-sm text-main-${purity == 'Pure' ? 'orange' : 'gray'}`}>Pure</p>
            </button>
          </div>
        </section>
      )}
    </>
  )
}