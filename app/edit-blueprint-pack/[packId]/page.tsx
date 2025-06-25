import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { getPropertiesFromAccessToken } from '../../../utils/kinde'
import EditBlueprintForm from './form'
import Main from '../../../components/Main'
import { getAllBlueprintsByBlueprintPackId, getBlueprintPackById } from '../../../services/blueprintPack'
import { getAllBlueprintsByPioneer } from '../../../services/blueprint'
import { getPioneerByEmail } from '../../../services/pioneer'

export default async function EditBlueprintPackPage({ params }: { params: { packId: string } }) {
  const blueprintPackId = parseInt(params.packId)
  const { getUser, isAuthenticated } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/')
  }

  const user = await getUser()
  if (!user || !user.email) {
    redirect('/')
  }

  const email = user.email
  const pioneer = await getPioneerByEmail(email)

  if (!pioneer) {
    redirect('/')
  }

  const blueprintPack = await getBlueprintPackById(blueprintPackId)
  const allBlueprintsOfPioneer = await getAllBlueprintsByPioneer(pioneer.name)
  const selectedBlueprints = await getAllBlueprintsByBlueprintPackId(blueprintPackId)

  // If the blueprint does not exist or the user is not the pioneer of the blueprint, redirect to the home page
  if (!blueprintPack || blueprintPack.pioneerName !== pioneer?.name) {
    redirect('/')
  }

  return (
    <Main classname="p-8" image='edit-blueprint-banner' imagePosition='right'>
      <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Edit blueprint pack</h1>
      <div className='w-full h-[2px] bg-gray-600 mb-4' />
      <EditBlueprintForm blueprintPack={blueprintPack} blueprints={allBlueprintsOfPioneer} selectedBlueprints={selectedBlueprints} />
    </Main>
  )
}