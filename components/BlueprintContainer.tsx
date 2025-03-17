import BlueprintCard from './BlueprintCard'

type Card = {
  id: number
  title: string
  images: string[]
  averageRating: number
}

export default function BlueprintContainer({ blueprints, title, isEdit = false }: { blueprints: Card[], title: string, isEdit?: boolean }) {
  return (
    <div className='w-full flex flex-col flex-grow'>
      <div className="w-full h-10 sm:h-12 flex items-center bg-main-bg pl-4">
        <h1 className="text-lg sm:text-xl font-medium">{title}</h1>
      </div>
      <div className='w-full min-h-[calc(100%-48px)] bg-light-bg'>
        <section className='w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-3 p-2 lg:p-3'>
          {
            blueprints?.length > 0 ?
              blueprints.map((blueprint, i: number) => {
                return (
                  <BlueprintCard key={i} blueprint={blueprint} isEdit={isEdit} />
                )
              }) :
              <p className='text-2xl'>No blueprints found</p>
          }
        </section>
      </div>
    </div>
  )
}