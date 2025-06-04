import Main from "../../../components/Main"
import Link from "next/link"
import Image from "next/image"
import { getPioneersWithBlueprintStats } from "../../../services/pioneer"

export default async function PioneersPage() {
  const pioneers = await getPioneersWithBlueprintStats()

  return (
    <Main>
      <div className='w-full h-full flex flex-col flex-grow'>
        <div className="w-full h-10 sm:h-12 flex items-center justify-between bg-main-bg p-4">
          <h1 className="text-lg sm:text-xl font-medium">Blueprint Architects</h1>
        </div>
        <div className='w-full h-full bg-light-bg'>
          <section className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-2 lg:gap-3 p-2 lg:p-3'>
            {
              pioneers?.length > 0 ?
                pioneers.map((pioneer, i: number) => {
                  return (
                    <Link href={`/pioneers/${pioneer.name}`} key={i} className="w-full h-full flex flex-col items-center justify-center bg-main-bg p-4 rounded-md shadow-md hover:bg-dark-bg">
                      <div className={`w-16 h-16 relative flex items-center justify-center`}>
                        <Image
                          src={`/images/avatars/${pioneer.avatar}.png`}
                          alt={pioneer.name}
                          fill
                          sizes="80%"
                          className={`rounded-full bg-avatar-${pioneer.color}`}
                        />
                      </div>
                      <h2 className="text-lg font-semibold">{pioneer.name}</h2>
                      <p className="text-sm text-gray-200">Blueprints: {pioneer.blueprints}</p>
                      <p className="text-sm text-gray-200">Downloads: {pioneer.downloads}</p>
                    </Link>
                  )
                }) :
                <p className='text-2xl'>No pioneers found</p>
            }
          </section>
        </div>
      </div>
    </Main>
  )
}