import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import RateBlueprint from "./rateBlueprint"
import DownloadSection from "./downloadSection"
import ImageCarousel from "../../../components/ImageCarousel"
import { getBlueprintById, getBlueprintPacksByBlueprintId } from "../../../services/blueprint"
import { getKindeServerSession, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPropertiesFromAccessToken } from "../../../utils/kinde"
import Main from "../../../components/Main"
import { ExternalLink, Star } from "lucide-react"
import CommentsSection from "./commentsSection"
import { getCommentsByBlueprintId } from "../../../services/comment"
import BlueprintOwnerSection from "../../../components/BlueprintOwnerSection"
import { getPioneerByEmail } from "../../../services/pioneer"
import { redirect } from "next/navigation"

export async function generateMetadata({ params }: { params: { blueprintId: string } }): Promise<Metadata> {
  const blueprintId = parseInt(params.blueprintId)
  // If blueprintId is not a number, don't fetch the blueprint
  if (isNaN(blueprintId)) {
    return {
      title: "Invalid blueprint ID - FicsitDB",
      description: "Invalid blueprint ID",
    }
  }

  const blueprint = await getBlueprintById(blueprintId)

  return {
    title: blueprint ? `${blueprint.title} - FicsitDB` : "Blueprint Not Found - FicsitDB",
    description: blueprint ? `Download or explore the blueprint: ${blueprint.title} in Satisfactory.` : "Blueprint not found in FicsitDB.",
  }
}

export default async function BlueprintPage({ params }: { params: { blueprintId: string } }) {
  const blueprintId = parseInt(params.blueprintId)

  // If blueprintId is not a number, don't fetch the blueprint
  if (isNaN(blueprintId)) {
    return (
      <Main classname="flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Invalid blueprint ID</p>
        <Link
          href="/blueprints">
          <p className="text-logo-blue hover:underline">Go back to blueprints</p>
        </Link>
      </Main>
    )
  }

  const blueprint = await getBlueprintById(blueprintId)


  if (!blueprint) {
    return (
      <Main classname="flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Blueprint not found</p>
        <Link
          href="/blueprints">
          <p className="text-logo-blue hover:underline">Go back to blueprints</p>
        </Link>
      </Main>
    )
  }


  if (blueprint.visibility === 'private') {
    const { getUser, isAuthenticated } = getKindeServerSession()
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return (
        <Main classname="flex flex-col items-center justify-center">
          <p className="text-xl mb-4">This blueprint is private.</p>
          <LoginLink>
            <p className="text-logo-blue hover:underline">Please log in to view this blueprint</p>
          </LoginLink>
        </Main>
      )
    }

    const user = await getUser()

    if (!user || !user.email) {
      return (
        <Main classname="flex flex-col items-center justify-center">
          <p className="text-xl mb-4">User not found</p>
          <Link
            href="/">
            <p className="text-logo-blue hover:underline">This blueprint is private.</p>
          </Link>
        </Main>
      )
    }

    const pioneer = await getPioneerByEmail(user.email)

    if (!pioneer) {
      return redirect('/create-pioneer')
    }

    if (pioneer.name !== blueprint.pioneerName) {
      return (
        <Main classname="flex flex-col items-center justify-center">
          <p className="text-xl mb-4">You are not authorized to view this blueprint.</p>
          <Link
            href={`/pioneers/${pioneer.name}`}>
            <p className="text-logo-blue hover:underline">Go to your pioneer profile</p>
          </Link>
        </Main>
      )
    }
  }



  // Get the blueprint packs associated with this blueprint
  const blueprintPacks = await getBlueprintPacksByBlueprintId(blueprintId)

  const initialComments = await getCommentsByBlueprintId(blueprintId)

  function linkify(text: string) {
    if (!text) return ''
    return text.replace(/(https:\/\/[^\s]+)/g, (url) => `<a href="${url}" class="text-main-orange underline break-all" target="_blank" rel="noopener noreferrer">${url}</a>`)
  }

  return (
    <Main classname="bg-dark-bg" dontFill>
      <BlueprintOwnerSection id={blueprintId} pioneerName={blueprint.pioneerName} visibility={blueprint.visibility} />
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-stretch gap-2 lg:gap-4 mb-2 lg:mb-4">
        <section className="w-full lg:w-2/3 h-full">
          <div className="w-full p-3 lg:p-0 lg:h-20 flex items-center justify-center bg-black text-lg xl:text-2xl text-center text-white font-secondary font-semibold">
            {blueprint.title}
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between bg-light-bg p-4">
            <div className="flex flex-col items-start flex-1 gap-4 mb-4 sm:mb-0">
              <Link
                href={`/pioneers/${blueprint.pioneerName}`}
                className="flex flex-row items-center p-1 pr-4 rounded-full bg-dark-bg hover:bg-main-bg text-white hover:underline"
              >
                <Image
                  src={`/images/avatars/${blueprint.pioneerAvatar}.png`}
                  width={40}
                  height={40}
                  alt={blueprint.pioneerName}
                  className={`rounded-full bg-avatar-${blueprint.pioneerAvatarColor}`}
                />
                <p className="font-medium ml-2">{blueprint.pioneerName}</p>
              </Link>
              <div className="flex flex-row flex-wrap gap-4">
                {
                  blueprint.categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/blueprints?category=${category}`}
                      className="text-gray-300 hover:text-logo-blue"
                    >
                      <div className="flex items-center justify-center px-3 py-2 bg-main-bg">
                        <p className="text-sm font-semibold">{category}</p>
                      </div>
                    </Link>
                  ))
                }
              </div>
              {blueprint.videoUrl && (
                <a href={blueprint.videoUrl} className="flex flex-row items-center gap-2 py-2 px-4 rounded-full bg-dark-bg hover:bg-main-bg text-white" target="_blank" rel="noopener noreferrer">
                  <Image src="/icons/youtube-logo.svg" alt="Youtube Logo" width={24} height={24} />
                  <p className="text-gray-300">Blueprint Video</p>
                  <ExternalLink className="w-4 h-4 text-gray-300" />
                </a>
              )}
            </div>
            <div className="flex flex-col gap-4 font-semibold text-gray-200">
              <div className="flex flex-row flex-grow items-center justify-between gap-4">
                <p>Rating:</p>
                <div className="flex flex-row gap-1">
                  <div className="relative w-6 h-6 flex flex-row items-center text-transparent">
                    <Star className="w-5 h-5 fill-main-bg absolute top-0 left-0" />

                    <div
                      className="absolute top-0 left-0 h-full overflow-hidden"
                      style={{ width: `${(blueprint.averageRating / 5) * 100 - 8}%` }}
                    >
                      <Star className="w-5 h-5 fill-main-orange" />
                    </div>
                  </div>

                  <p className="font-normal">( <span className="font-semibold">{blueprint.averageRating.toFixed(1)}</span> )</p>
                </div>
              </div>
              <div className="flex flex-row flex-grow items-center justify-between gap-4">
                <p>Created:</p>
                <p>{blueprint.createdAt.getDate()}/{blueprint.createdAt.getMonth() + 1}/{blueprint.createdAt.getFullYear()}</p>
              </div>
              <div className="flex flex-row flex-grow items-center justify-between gap-4">
                <p>Updated:</p>
                <p>{blueprint.updatedAt.getDate()}/{blueprint.updatedAt.getMonth() + 1}/{blueprint.updatedAt.getFullYear()}</p>
              </div>
              <div className="flex flex-row flex-grow items-center justify-between gap-4">
                <p>Downloads:</p>
                <div className="flex flex-row gap-1 items-center">
                  <p>{blueprint.downloads}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <AdBanner classname="w-full h-14 flex lg:hidden items-center justify-center"
          dataAdSlot="6097316089"
          dataFullWidthResponsive={false}
          dataAdFormat="fixed"
          dynamicHeight={false}
          adHeight={50}
        /> */}
        <DownloadSection
          blueprintId={blueprintId}
          files={blueprint.files}
          pioneerName={blueprint.pioneerName}
        />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-4">
        <ImageCarousel images={blueprint.images} title={blueprint.title} />
        <div className="w-full lg:w-1/3 flex flex-col flex-grow gap-2 lg:gap-4">
          <RateBlueprint blueprintId={blueprintId} blueprintPackIds={blueprintPacks.map(pack => pack.id)} />
          {/* <AdBanner classname="w-full h-full hidden lg:flex items-center justify-center"
            dataAdSlot="9859648886"
            dataFullWidthResponsive={true}
            dynamicHeight={false}
            adPadding={16}
          />
          <AdBanner classname="w-full min-h-64 flex lg:hidden items-center justify-center"
            dataAdSlot="9859648886"
            dataFullWidthResponsive={false}
          /> */}
          <div className="w-full h-full hidden lg:flex items-center justify-center bg-main-bg p-4">
            <p className="text-lg text-gray-500 font-bold">🚧 There will be an ad here 🚧 </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-4 items-stretch">
        {blueprint.description ? (
          <div className={`flex-1 mt-2 lg:mt-4 w-full lg:basis-2/3 flex flex-col`}>
            <div className="w-full h-10 sm:h-12 flex items-center bg-main-bg p-4">
              <h1 className="text-lg sm:text-xl font-medium">Description</h1>
            </div>
            <div className="w-full bg-light-bg text-gray-200 p-4 flex-1">
              <div
                className="whitespace-pre-wrap font-main"
                dangerouslySetInnerHTML={{ __html: linkify(blueprint.description) }}
              />
            </div>
          </div>
        ) : blueprintPacks.length > 0 && (
          <div className="flex-1 hidden lg:flex items-center justify-center mt-2 lg:mt-4 bg-main-bg w-full lg:basis-2/3">
            <p className="text-lg text-gray-500 font-bold">🚧 There will be an ad here 🚧 </p>
          </div>
        )}
        {blueprintPacks.length > 0 && (
          <div className="flex-1 w-full lg:basis-1/3 flex flex-col mt-2 lg:mt-4">
            <div className="w-full h-10 sm:h-12 flex items-center bg-main-bg p-4">
              <h1 className="text-lg sm:text-xl font-medium">Associated Blueprint Packs</h1>
            </div>
            <div className="w-full flex flex-col bg-light-bg text-gray-200 p-2 lg:p-4 flex-1 gap-2 lg:gap-4">
              {blueprintPacks.map((pack, index) => (
                <Link
                  key={index}
                  href={`/blueprint-packs/${pack.id}`}
                  className="w-full flex items-center gap-2 p-2 bg-main-bg hover:bg-dark-bg rounded-md"
                >
                  <div className="w-[128px] h-[72px] aspect-[16/9] relative rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={pack.images[0]}
                      alt={pack.title}
                      fill
                      quality={50}
                      className="object-cover w-full h-full"
                      sizes="128px"
                    />
                  </div>
                  <p className="w-full text-center text-sm xl:text-lg font-semibold">{pack.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <CommentsSection initialComments={initialComments} blueprintId={blueprintId} />
    </Main>
  )
}