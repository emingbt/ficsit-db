import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import CreateBlueprintPackForm from "./form"
import Main from "../../components/Main"
import Link from "next/link"
import { ChevronRightIcon, FileQuestionIcon, InfoIcon, PlusIcon, Settings2 } from "lucide-react"
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
      {
        blueprintsOfPioneer.length === 0 ? (
          <div className="w-full max-w-2xl mx-auto py-12 text-slate-200">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-logo-blue rounded-full flex items-center justify-center">
                <FileQuestionIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-slate-200 mb-3">
                No Blueprints Available
              </h2>
              <p className="text-slate-400 lg:text-lg">
                You need public or unlisted blueprints to create a pack
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="border border-light-orange rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-slate-200 mb-3 flex items-center">
                    <Settings2 className="w-5 h-5 mr-2 text-main-orange" />
                    Manage Blueprints
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Update your existing blueprints' visibility settings
                  </p>
                  <Link
                    href="/settings"
                    className="inline-flex items-center px-4 py-2 bg-main-orange hover:bg-dark-orange text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Go to Settings
                    <ChevronRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </div>

                <div className="border border-logo-blue rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-slate-200 mb-3 flex items-center">
                    <PlusIcon className="w-5 h-5 mr-2 text-logo-blue" />
                    Create New Blueprint
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Start fresh with a new blueprint for your pack
                  </p>
                  <Link
                    href="/create-blueprint"
                    className="inline-flex items-center px-4 py-2 bg-[#2995e1] hover:bg-logo-blue text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Create Blueprint
                    <ChevronRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
              <div className="py-6 px-4">
                <h3 className="font-semibold text-light-orange mb-2 flex items-center">
                  <InfoIcon className="w-5 h-5 mr-2" />
                  Why can't I see my blueprints?
                </h3>
                <p className="text-slate-200 text-sm">
                  Private blueprints cannot be added to packs. Only public and unlisted blueprints are available for blueprint packs.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <CreateBlueprintPackForm blueprints={blueprintsOfPioneer} />
        )
      }
    </Main>
  )
}