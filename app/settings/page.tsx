import { redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPioneerByEmail, getPioneerSocialLinks } from "../../services/pioneer"
import ProfileSection from "./profileSection"
import AvatarSection from "./avatarSection"
import { getAllBlueprintsByPioneer } from "../../services/blueprint"
import Main from "../../components/Main"
import BlueprintContainer from "../../components/BlueprintContainer"
import SocialLinksSection from "./socialLinksSection"
import { getAllBlueprintPacksByPioneer } from "../../services/blueprintPack"

export default async function SettingsPage() {
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

  const socialLinks = await getPioneerSocialLinks(pioneer.name)

  // Get all blueprints by the pioneer
  const blueprints = await getAllBlueprintsByPioneer(pioneer.name)

  // Get all blueprint packs by the pioneer
  const blueprintPacks = await getAllBlueprintPacksByPioneer(pioneer.name)

  return (
    <Main classname="flex flex-col items-stretch bg-dark-bg">
      <div className="w-full flex flex-1 flex-col lg:flex-row items-stretch gap-2 lg:gap-4 bg-dark-bg mb-2 lg:mb-4">
        <div className="w-full lg:w-2/5 h-full flex flex-col gap-2 lg:gap-4 bg-dark-bg">
          <ProfileSection pioneer={pioneer} />
          <SocialLinksSection socialLinks={socialLinks} />
        </div>
        <AvatarSection pioneer={pioneer} />
      </div>
      {
        blueprints?.length > 0 &&
        <BlueprintContainer entries={blueprints} title="Edit your Blueprints" isEdit />
      }
      {
        blueprintPacks?.length > 0 &&
        <div className="mt-2 lg:mt-4">
          <BlueprintContainer entries={blueprintPacks} title="Edit your Blueprint Packs" isEdit type="blueprintPack" />
        </div>
      }
    </Main>
  )
}