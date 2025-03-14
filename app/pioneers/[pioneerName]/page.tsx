import Image from "next/image"
import BlueprintCard from "../../../components/blueprintCard"
import { getAllBlueprintsByPioneer } from "../../../services/blueprint"
import { getPioneerByName } from "../../../services/pioneer"
import Main from "../../../components/Main"

export default async function PioneerPage({ params }: { params: { pioneerName: string } }) {
  const pioneerName = params.pioneerName
  const pioneer = await getPioneerByName(pioneerName)

  if (!pioneer) {
    return (
      <main className="w-full h-full bg-dark-bg p-[10px] lg:p-4">
        <div className="w-full h-10 sm:h-12 flex items-center bg-main-bg pl-4">
          <h1 className="text-xl sm:text-2xl font-medium text-logo-blue">Pioneer</h1>
        </div>
        <section className='w-full h-full flex items-center justify-center'>
          <p className='text-2xl'>Pioneer not found</p>
        </section>
      </main>
    )
  }

  const blueprints = await getAllBlueprintsByPioneer(pioneerName)

  return (
    <Main classname="flex flex-col bg-dark-bg">
      <div className="w-full h-16 bg-black flex sm:hidden items-center justify-center text-lg font-semibold">
        {pioneer.name}
      </div>
      <div className="w-full h-28 sm:h-48 lg:h-72 flex flex-row mb-[10px] lg:mb-4">
        <div className={`h-full aspect-square relative bg-avatar-${pioneer.color}`}>
          <Image
            src={`/images/avatars/${pioneer.avatar}.png`}
            alt={pioneer?.name}
            fill
            priority
          />
        </div>
        <div className="h-full w-full flex flex-1 flex-col font-medium text-sm lg:text-lg">
          <div className="w-full h-24 hidden sm:flex items-center justify-center bg-black text-lg xl:text-2xl text-center text-white font-semibold">
            {pioneer.name}
          </div>
          <div className="w-full h-full sm:h-16 flex items-center justify-between bg-main-bg px-4">
            <p>Member since:</p>
            <p>{pioneer.createdAt.getDate()}/{pioneer.createdAt.getMonth()}/{pioneer.createdAt.getFullYear()}</p>
          </div>
          <div className="w-full h-full sm:h-16 flex items-center justify-between bg-light-bg px-4">
            <p>Blueprints published:</p>
            <p>{blueprints.length}</p>
          </div>
          <div className="w-full h-full sm:h-16 flex items-center justify-between bg-main-bg px-4">
            {/* //Will be implemented in the next step */}
            <p>Blueprints downloads:</p>
            <p>0</p>
          </div>
        </div>
        <div className="h-full w-[336px] hidden lg:flex items-center justify-center bg-black">
          Ad
        </div>
      </div>
      <div className="w-full h-[50px] sm:h-[90px] flex lg:hidden items-center justify-center bg-black mb-[10px]">
        Ad
      </div>
      <div className="w-full h-8 sm:h-14 flex items-center bg-main-bg pl-4">
        <h1 className="text-lg sm:text-xl font-medium">Blueprints</h1>
      </div>
      <section className='w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-3 justify-center bg-light-bg p-2 lg:p-3'>
        {
          blueprints?.length > 0 ?
            blueprints.map((blueprint, i: number) => {
              return (
                <BlueprintCard key={i} blueprint={blueprint} />
              )
            }) :
            <div className="col-span-2 sm:col-span-2 lg:col-span-3 xl:col-span-5 w-full h-full flex items-center justify-center">
              <p className='text-xl my-16'>No blueprints found</p>
            </div>
        }
      </section>
    </Main>
  )
}