import Image from 'next/image'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { getBlueprintById } from '../../../services/blueprint'
import { getPropertiesFromAccessToken } from '../../../utils/kinde'
import EditBlueprintForm from './form'
import Main from '../../../components/Main'

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
    <Main classname="p-8" image='edit-blueprint-banner'>
      <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Edit blueprint</h1>
      <div className='w-full h-[2px] bg-gray-600 mb-4' />
      <EditBlueprintForm blueprint={blueprint} />
    </Main>
  )
}