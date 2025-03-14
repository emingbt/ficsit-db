import { redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPioneerByEmail } from "../../services/auth"
import ProfileSection from "./profileSection"
import AvatarSection from "./avatarSection"
import BlueprintCard from "../../components/blueprintCard"
import { getAllBlueprintsByPioneer } from "../../services/blueprint"
import Main from "../../components/Main"

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
    <Main classname="bg-dark-bg">
      <div className="w-full flex flex-col lg:flex-row items-stretch gap-2 lg:gap-4 bg-dark-bg mb-2 lg:mb-4">
        <ProfileSection pioneer={pioneer} />
        <AvatarSection pioneer={pioneer} />
      </div>
      {
        blueprints?.length > 0 &&
        <div className="w-full bg-main-bg">
          <div className="w-full h-10 sm:h-12 flex items-center bg-main-bg pl-4">
            <h1 className="text-lg sm:text-xl font-medium">Edit your Blueprints</h1>
          </div>
          <section className='w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-3 justify-center bg-light-bg p-2 lg:p-3'>
            {
              blueprints.map((blueprint, i: number) => {
                return (
                  <BlueprintCard key={i} blueprint={blueprint} isEdit />
                )
              })
            }
          </section>
        </div>
      }
    </Main>
  )
}