export default async function Building({ params }: { params: { building: string } }) {
  const slug = params.building

  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000'
  const result = await fetch(`${baseUrl}/api/building?slug=${slug}`)
  const data = await result.json()

  const building = data.building


  return (
    <div>
      <h1>{building.name}</h1>
    </div>
  )
}