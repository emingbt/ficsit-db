import { redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPioneerByEmail } from "../../services/auth"
import ProfileSection from "./profileSection"
import AvatarSection from "./avatarSection"
import BlueprintCard from "../../components/blueprintCard"
import { getAllBlueprintsByPioneer } from "../../services/blueprint"

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
    <main className="w-full h-full bg-dark-bg p-[10px] lg:p-4">
      <div className="w-full h-full lg:h-base xl:h-base-lg flex flex-col lg:flex-row items-center justify-center gap-[10px] lg:gap-5 bg-dark-bg mb-[10px] lg:mb-4">
        <ProfileSection pioneer={pioneer} />
        <AvatarSection pioneer={pioneer} />
      </div>
      {
        blueprints?.length > 0 &&
        <div className="w-full bg-main-bg">
          <div className="w-full h-10 sm:h-12 flex items-center bg-main-bg pl-4">
            <h1 className="text-lg sm:text-xl font-medium">Edit your Blueprints</h1>
          </div>
          <section className='w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-3 justify-center bg-light-bg p-2 lg:p-3 mb-[10px] lg:mb-4'>
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
    </main>
  )
}