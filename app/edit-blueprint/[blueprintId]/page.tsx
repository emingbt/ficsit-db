import Image from 'next/image'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { getBlueprintById } from '../../../services/blueprint'
import { getPropertiesFromAccessToken } from '../../../utils/kinde'
import EditBlueprintForm from './form'

export default async function EditBlueprintPage({ params }: { params: { blueprintId: string } }) {
  const blueprintId = parseInt(params.blueprintId)
  const { isAuthenticated, getAccessToken } = getKindeServerSession()
  const authenticated = await isAuthenticated()
  const accessToken = await getAccessToken()

  if (!authenticated) {
    redirect('/')
  }

  const pioneer = getPropertiesFromAccessToken(accessToken)

  const blueprint = await getBlueprintById(blueprintId)

  // If the blueprint does not exist or the user is not the pioneer of the blueprint, redirect to the home page
  if (!blueprint || blueprint.pioneerName !== pioneer?.name) {
    redirect('/')
  }

  return (
    <main className='w-full min-h-base xl:min-h-base-lg p-[10px] lg:p-4 bg-dark-bg'>
      <div className='w-full min-h-content lg:min-h-content-lg xl:min-h-content-xl flex flex-row bg-main-bg'>
        <div className='w-full lg:w-1/2 flex flex-col lg:justify-center p-6 lg:p-16 font-secondary'>
          <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Edit blueprint</h1>
          <EditBlueprintForm blueprint={blueprint} />
        </div>
        <div className="hidden w-1/2 lg:flex relative">
          <Image
            src="/images/edit-blueprint-banner.webp"
            alt="blueprint-page"
            fill
            className="object-cover object-right w-full h-full"
            sizes='100%'
            priority
          />
        </div>
      </div>
    </main>
  )
}