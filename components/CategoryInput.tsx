'use client'

import { ReactNode, useState } from 'react'

export default function CategoryInput({ error, existingCategories }: { error?: ReactNode, existingCategories?: string[] }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(existingCategories || [])

  const categories = [
    'Architecture',
    'Belts',
    'Compact',
    'Decorations',
    'Foundations',
    'Hypertubes',
    'Load Balancer',
    'Logistics',
    'Pipes',
    'Power',
    'Production',
    'Roads',
    'Signs',
    'Storage',
    'Supports',
    'Tracks',
    'Trains',
    'Transportation'
  ]

  return (
    <div>
      <label htmlFor='category'>Category</label>
      <div className={
        `w-full h-8 lg:h-10 p-2 ${!error && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!error ? 'main-orange' : 'error'}
          ${error && 'border-b-2 border-error'} select-none`
      }>
        {
          selectedCategories.length === 0 ?
            <p className='text-main-gray'>Select a category</p> :
            <p>{selectedCategories.join(", ")}</p>
        }
      </div>
      {
        error &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{error}</p>
        </div>
      }
      <div className='w-full flex flex-row flex-wrap justify-start gap-2 mb-6'>
        {categories.map((category, index) => (
          <div key={index} className={`px-2 py-1 relative cursor-pointer bg-light-bg ${selectedCategories.includes(category) && 'text-main-orange border-b-[1px] border-b-main-orange pb-0'}`}>
            <input
              id={category}
              value={category}
              name='category'
              checked={selectedCategories.includes(category)}
              className='bg-transparent w-full h-full opacity-0 cursor-pointer absolute'
              type='checkbox'
              onChange={() => {
                if (selectedCategories.includes(category)) {
                  setSelectedCategories(selectedCategories.filter((cat) => cat !== category))
                } else {
                  setSelectedCategories([...selectedCategories, category])
                }
              }}
            />
            <p className={`text-sm ${selectedCategories.includes(category) ? 'text-light-orange' : 'text-main-gray'}`}>{category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}