import { redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPioneerByEmail } from "../../services/auth"
import ProfileSection from "./profileSection"
import AvatarSection from "./avatarSection"
import BlueprintCard from "../../components/BlueprintCard"
import { getAllBlueprintsByPioneer } from "../../services/blueprint"
import Main from "../../components/Main"
import BlueprintContainer from "../../components/BlueprintContainer"

export default async function ProfilePage() {
  const { getUser, isAuthenticated } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/')
  }

  const user = await getUser()

  if (!user || !user.email) {
    redirect('/')
  }
  // Get the pioneer name, email, avatar, and color from the database
  const pioneer = await getPioneerByEmail(user.email)

  if (!pioneer) {
    redirect('/create-pioneer')
  }

  // Get all blueprints by the pioneer
  const blueprints = await getAllBlueprintsByPioneer(pioneer.name)

  return (
    <Main classname="flex flex-col items-stretch bg-dark-bg">
      <div className="w-full flex flex-1 flex-col lg:flex-row items-stretch gap-2 lg:gap-4 bg-dark-bg mb-2 lg:mb-4">
        <ProfileSection pioneer={pioneer} />
        <AvatarSection pioneer={pioneer} />
      </div>
      {
        blueprints?.length > 0 &&
        <BlueprintContainer blueprints={blueprints} title="Edit your Blueprints" isEdit />
      }
    </Main>
  )
}