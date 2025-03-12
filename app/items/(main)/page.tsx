import { getItems } from '../../../utils/gameDataFetcher'
import { ItemCard } from '../../../components/itemCard'
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
    <Main>
      <Link href="/deprecated" className='w-full h-6 sm:h-8 flex items-center justify-center bg-error hover:bg-red-600'>
        <p className='text-white text-center text-xs sm:text-base'>Items are deprecated</p>
      </Link>
      <section className='w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1 lg:gap-2 justify-center bg-light-bg p-2 lg:p-3'>
        {items.map((item, i: number) => {
          return (
            <ItemCard item={item} key={i} />
          )
        })}
      </section>
    </Main>
  )
}