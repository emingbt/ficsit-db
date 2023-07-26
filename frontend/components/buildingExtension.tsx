"use client"

import { useState } from "react"

import type { BuildingType } from "../interfaces"

export default function BuildingExtension({ building }: { building: BuildingType }) {
  const [clockSpeed, setClockSpeed] = useState<number>(100)
  const [purity, setPurity] = useState<'Impure' | 'Normal' | 'Pure'>('Normal')

  return (
    <>
      {building.isOverclockable && (
        <section className="w-full sm:h-12 flex flex-col sm:flex-row items-center bg-light-bg">
          <div className="w-full sm:w-32 md:w-40 lg:w-48 h-10 sm:h-full shrink-0 flex flex-row items-center justify-center bg-dark-gray">
            <p className='text-sm lg:text-base'>{building.powerConsumption || building.powerProduction} MW</p>
            {building.isResourceExtractor && (
              <div className='h-full flex sm:hidden flex-row items-center text-sm'>
                <div className='w-0.5 h-4/5 sm:h-full bg-main-orange mx-4' />
                <p>{building.resourceExtractSpeed}/min</p>
              </div>
            )}
          </div>
          <div className='w-full h-10 sm:h-full flex flex-row items-center justify-center bg-light-bg'>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setClockSpeed(50)}>
              <p className={`text-sm text-main-${clockSpeed == 50 ? 'orange' : 'gray'}`}>
                %50
              </p>
            </button>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setClockSpeed(100)}>
              <p className={`text-sm text-main-${clockSpeed == 100 ? 'orange' : 'gray'}`}>
                %100
              </p>
            </button>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setClockSpeed(150)}>
              <p className={`text-sm text-main-${clockSpeed == 150 ? 'orange' : 'gray'}`}>
                %150
              </p>
            </button>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setClockSpeed(200)}>
              <p className={`text-sm text-main-${clockSpeed == 200 ? 'orange' : 'gray'}`}>
                %200
              </p>
            </button>
            <button className='w-16 h-8 bg-dark-bg rounded-sm mx-1'
              onClick={() => setClockSpeed(250)}>
              <p className={`text-sm text-main-${clockSpeed == 200 ? 'orange' : 'gray'}`}>
                %250
              </p>
            </button>
          </div>
        </section>
      )}
      {building.isResourceExtractor && (
        <section className='w-full h-10 sm:h-12 flex flex-row bg-dark-gray'>
          <div className='hidden sm:w-32 md:w-40 lg:w-48 h-full sm:flex shrink-0 items-center justify-center bg-light-bg'>
            <p className='text-sm lg:text-base'>{building.resourceExtractSpeed}/min</p>
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