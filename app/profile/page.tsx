import { redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPioneerByEmail } from "../../services/auth"
import ProfileSection from "./profileSection"
import AvatarSection from "./avatarSection"

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

  return (
    <main className="w-full h-full bg-dark-bg p-[10px] lg:p-4">
      <div className="w-full h-full lg:h-base xl:h-base-lg flex flex-col lg:flex-row items-center justify-center gap-5 bg-dark-bg">
        <ProfileSection pioneer={pioneer} />
        <AvatarSection pioneer={pioneer} />
      </div>
    </main>
  )
}