import SearchSection from "../../components/sections/searchSection"

export default async function Search({ searchParams }: {
  searchParams: { name: string, category: "items" | "buildings" } | undefined
}) {
  const name = searchParams?.name?.toLowerCase() || ""

  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000'
  const result = await fetch(`${baseUrl}/api/search?name=${name}`, { cache: 'no-store' })
  const data = await result.json()

  return (
    <SearchSection data={data} />
  )
}