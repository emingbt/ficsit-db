import { Suspense } from "react"
import Loading from "./loading"

export default function ItemsLayout({ children }) {
  return (
    <main className="w-full h-full bg-dark-bg p-[10px] lg:p-4">
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </main>
  )
}