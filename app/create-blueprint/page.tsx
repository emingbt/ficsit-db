import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"
import CreateBlueprintForm from "./form"

export default async function CreatePioneerPage() {
  const { isAuthenticated } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/')
  }

  return (
    <main className='w-full min-h-base xl:min-h-base-lg p-[10px] lg:p-4 bg-dark-bg'>
      <div className='w-full min-h-content lg:min-h-content-lg xl:min-h-content-xl flex flex-row bg-main-bg'>
        <div className='w-full lg:w-1/2 lg:min-w-[480px] flex flex-col lg:justify-center p-6 lg:p-10 xl:p-16 font-secondary'>
          <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Create a new blueprint</h1>
          <p className=' text-xs lg:text-base mb-4 text-main-gray'>Share your ideas with other pioneers.</p>
          <CreateBlueprintForm />
        </div>
        <div className="hidden w-1/2 lg:flex relative">
          <Image
            src="/images/create-blueprint-banner.webp"
            alt="blueprint-page"
            fill
            className="object-cover object-left w-full h-full"
            sizes='100%'
            priority
          />
        </div>
      </div>
    </main>
  )
}