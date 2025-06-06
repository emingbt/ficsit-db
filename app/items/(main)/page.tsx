import { getItems } from '../../../utils/gameDataFetcher'
import { ItemCard } from '../../../components/ItemCard'
import Main from '../../../components/Main'
import Link from 'next/link'

export default async function ItemsPage() {
  const items = await getItems()

  if (!items) {
    return (
      <main className='w-full h-full flex justify-center items-center'>
        <p className='text-2xl'>No items found</p>
      </main>
    )
  }

  return (
    <Main dontFill>
      <section className='w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-[1px] sm:gap-1 lg:gap-2 justify-center bg-light-bg p-[2px] sm:p-2 lg:p-3'>
        {items.map((item, i: number) => {
          return (
            <ItemCard item={item} key={i} />
          )
        })}
      </section>
    </Main>
  )
}