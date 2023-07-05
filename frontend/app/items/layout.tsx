import { Suspense } from "react"
import Loading from "./loading"

export default function ItemsLayout({ children }) {
  return (
    <main className="w-full h-full bg-dark-bg p-[10px] lg:p-4">
      <section className='w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1 lg:gap-2 justify-center bg-light-bg p-1 lg: p-3'>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </section>
    </main>
  )
}