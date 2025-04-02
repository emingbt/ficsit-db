import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import Main from "../../components/Main"
import CreatePioneerForm from "./form"

export default async function CreatePioneerPage() {
  const { getUser, isAuthenticated } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  // Check if the user is authenticated, if not, redirect to the home page
  if (!authenticated) {
    redirect('/')
  }

  const user = await getUser()
  if (!user || !user.email) {
    redirect('/')
  }

  return (
    <Main classname="p-16 max-w-lg flex flex-col justify-center" image='create-pioneer-banner'>
      <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Create your account</h1>
      <p className=' text-xs lg:text-base mb-4 text-main-gray'>One last step to become a Ficsit pioneer!</p>
      <CreatePioneerForm />
    </Main>
  )
}