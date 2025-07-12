import { useState } from "react"
import { BlueprintCardProps } from "../interfaces"

export default function BlueprintSelector({ blueprints, blueprintsError, selectedBlueprints }: { blueprints: BlueprintCardProps[], blueprintsError?: string, selectedBlueprints?: BlueprintCardProps[] }) {
  const [selectedBlueprintIds, setSelectedBlueprintIds] = useState<number[]>(() => {
    if (selectedBlueprints && selectedBlueprints.length > 0) {
      return selectedBlueprints.map(bp => bp.id)
    }
    return []
  })

  const handleToggle = (id: number) => {
    if (selectedBlueprintIds.includes(id)) {
      setSelectedBlueprintIds(selectedBlueprintIds.filter(bid => bid !== id))
    } else {
      setSelectedBlueprintIds([...selectedBlueprintIds, id])
    }
  }

  if (!blueprints.length) return <div className="w-full text-xs lg:text-base text-error mb-4">No blueprints available.</div>

  return (
    <>
      <div className="w-full">
        <label className="block mb-2 font-semibold text-white" htmlFor="blueprints">Blueprints in this Pack<span className="text-main-orange">*</span></label>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 3xl:grid-cols-4 gap-3 bg-light-bg p-3">
          {blueprints.map(bp => {
            const selected = selectedBlueprintIds.includes(bp.id)
            const order = selected ? selectedBlueprintIds.indexOf(bp.id) + 1 : null
            return (
              <div
                key={bp.id}
                className={`relative flex flex-col items-center p-2 bg-main-bg rounded-md cursor-pointer border-2 transition-all duration-150 ${selected ? 'border-main-orange ring-2 ring-main-orange' : 'border-transparent hover:border-main-orange/60'}`}
                onClick={() => handleToggle(bp.id)}
                tabIndex={0}
                role="button"
                aria-pressed={selected}
              >
                <div className="w-full aspect-video bg-dark-bg rounded overflow-hidden flex items-center justify-center mb-2">
                  {bp.images && bp.images[0] ? (
                    <img src={bp.images[0]} alt={bp.title} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </div>
                <span className={`w-full text-center text-sm lg:text-base font-medium truncate ${selected ? 'text-main-orange' : 'text-white'}`}>{bp.title}</span>
                {selected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-main-orange rounded-full flex items-center justify-center text-white font-bold text-xs lg:text-base">
                    {order}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {/* Hidden inputs for form submission */}
        {selectedBlueprintIds.map(id => (
          <input key={id} type="hidden" name="blueprints" value={id} />
        ))}
      </div>
      <p className={`text-xs lg:text-base text-gray-400 ${!blueprintsError ? 'mb-4 lg:mb-6' : 'mb-0'}`}>
        Note: Private blueprints cannot be selected for packs.
      </p>
      {
        blueprintsError &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{blueprintsError}</p>
        </div>
      }
    </>
  )
}
