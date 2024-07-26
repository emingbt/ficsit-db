import { getItems } from '../../../utils/gameDataFetcher'
import { ItemCard } from '../../../components/itemCard'

import { Item } from '../../../interfaces'

export default async function ItemsPage() {
  const items = await getItems()

  if (!items) {
    return (
      <section className='w-full h-full flex justify-center items-center'>
        <p className='text-2xl'>No items found</p>
      </section>
    )
  }

  return (
    <main className="w-full h-full bg-dark-bg p-[10px] lg:p-4">
      <section className='w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1 lg:gap-2 justify-center bg-light-bg p-2 lg:p-3'>
        {items.map((item: Item, i: number) => {
          return (
            <ItemCard item={item} key={i} />
          )
        })}
      </section>
    </main>
  )
}