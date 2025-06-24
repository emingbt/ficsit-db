import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import CreateBlueprintForm from "./form"
import Main from "../../components/Main"
import { getPioneerByEmail } from "../../services/pioneer"

export default async function CreateBlueprintPage() {
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

  return (
    <Main classname="p-8" image='create-blueprint-banner' imagePosition="left">
      <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Create a new blueprint</h1>
      <p className=' text-xs lg:text-base mb-4 text-main-gray'>Share your ideas with other pioneers.</p>
      <CreateBlueprintForm />
    </Main>
  )
}