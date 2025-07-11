import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import CreateBlueprintPackForm from "./form"
import Main from "../../components/Main"
import { getPioneerByEmail } from "../../services/pioneer"
import { getAllBlueprintsByPioneer } from "../../services/blueprint"

export default async function CreateBlueprintPackPage() {
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

  // Get all blueprints of the pioneer
  // Filter out private blueprints to only show public and unlisted blueprints
  const blueprintsOfPioneer = (await getAllBlueprintsByPioneer(pioneer.name)).filter(blueprint => blueprint.visibility !== "private")

  return (
    <Main classname="p-8" image='create-blueprint-pack-banner' imagePosition="left" isPattern>
      <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Create a new blueprint pack</h1>
      <p className=' text-xs lg:text-base mb-4 text-main-gray'>Group your related blueprints.</p>
      <CreateBlueprintPackForm blueprints={blueprintsOfPioneer} />
    </Main>
  )
}