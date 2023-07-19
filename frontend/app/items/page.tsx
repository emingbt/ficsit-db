import { ItemCard } from '../../components/itemCard'

import { Item } from '../../interfaces'

export default async function Items() {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000'
  const result = await fetch(`${baseUrl}/api/items`)
  const items = await result.json()

  return (
    <section className='w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1 lg:gap-2 justify-center bg-light-bg p-2 lg:p-3'>
      {items.map((item: Item, i: number) => {
        return (
          <ItemCard item={item} key={i} />
        )
      })}
    </section>
  )
}