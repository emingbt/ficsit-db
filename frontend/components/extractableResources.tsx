import { ItemCard } from './itemCard'

import type { BuildingType } from "../interfaces"

export default function ExtractableResources({ resources }: {
  resources: BuildingType['resources']
}) {
  if (!resources || resources.length == 0) return null

  return (
    <section className={`w-full flex flex-col mt-4`}>
      <div className="w-full h-12 flex items-center px-4 bg-main-bg">
        <h1>Extractable Resources - ({resources.length})</h1>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-4 p-4 bg-light-bg">
        {resources.map((resource, i) => (
          <ItemCard item={resource} key={i} />
        ))}
      </div>
    </section>
  )
}