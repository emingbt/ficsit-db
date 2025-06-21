import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import RateBlueprint from "./rateBlueprint"
import ImageCarousel from "../../../components/ImageCarousel"
// import { getBlueprintPackById } from "../../../services/blueprintPack"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPropertiesFromAccessToken } from "../../../utils/kinde"
import Main from "../../../components/Main"
import { ExternalLink, Star } from "lucide-react"
// import CommentsSection from "./commentsSection"
import { getCommentsByBlueprintId } from "../../../services/comment"
import BlueprintOwnerSection from "../../../components/BlueprintOwnerSection"
import BlueprintContainer from "../../../components/BlueprintContainer"
import FicsitTips from "../../../components/FicsitTips"

export async function generateMetadata({ params }: { params: { blueprintPackId: string } }): Promise<Metadata> {
  const blueprintPackId = parseInt(params.blueprintPackId)
  // If blueprintPackId is not a number, don't fetch the blueprint
  if (isNaN(blueprintPackId)) {
    return {
      title: "Invalid blueprint ID - FicsitDB",
      description: "Invalid blueprint ID",
    }
  }

  // const blueprint = await getBlueprintPackById(blueprintPackId)
  const blueprint = {
    title: "Sample Blueprint Pack", // Placeholder, replace with actual logic to fetch blueprint pack
  } // Placeholder, replace with actual logic to fetch blueprint pack

  return {
    title: blueprint ? `${blueprint.title} - FicsitDB` : "Blueprint Not Found - FicsitDB",
    description: blueprint ? `Download or explore the blueprint: ${blueprint.title} in Satisfactory.` : "Blueprint not found in FicsitDB.",
  }
}

export default async function BlueprintPackPage({ params }: { params: { blueprintPackId: string } }) {
  const blueprintPackId = parseInt(params.blueprintPackId)

  // If blueprintPackId is not a number, don't fetch the blueprint
  if (isNaN(blueprintPackId)) {
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

  // const blueprintPack = await getBlueprintPackById(blueprintPackId)
  const blueprintPack = {
    id: blueprintPackId,
    title: "Sample Blueprint Pack", // Placeholder, replace with actual logic to fetch blueprint pack
    images: ["/images/sample-blueprint-pack.jpg"], // Placeholder, replace with actual images
    blueprints: 2, // Placeholder, replace with actual number of blueprints in the pack
    averageRating: 4.5, // Placeholder, replace with actual average rating
    downloads: 1000, // Placeholder, replace with actual download count
    pioneerName: "PioneerName", // Placeholder, replace with actual pioneer name
    pioneerAvatar: "avatar1", // Placeholder, replace with actual avatar
    pioneerAvatarColor: "blue", // Placeholder, replace with actual avatar color
    categories: ["Category1", "Category2"], // Placeholder, replace with actual categories
    videoUrl: "https://youtube.com/sample-video", // Placeholder, replace with actual video URL
    description: "This is a sample blueprint pack description.", // Placeholder, replace with actual description
    createdAt: new Date(),
    updatedAt: new Date(),
    files: [] // Placeholder, replace with actual files
  }

  if (!blueprintPack) {
    return (
      <Main classname="flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Blueprint Pack not found</p>
        <Link
          href="/blueprint-packs">
          <p className="text-logo-blue hover:underline">Go back to blueprint packs</p>
        </Link>
      </Main>
    )
  }

  // const blueprintsInPack = getBlueprintsByPackId(blueprintPackId)
  const blueprintsInPack = [
    { id: 1, title: "Blueprint 1", images: ["/images/blueprint1.jpg"], averageRating: 4.5, downloads: 500 },
    { id: 2, title: "Blueprint 2", images: ["/images/blueprint2.jpg"], averageRating: 4.0, downloads: 300 }
  ] // Placeholder, replace with actual logic to fetch blueprints in the pack

  const { getAccessToken } = getKindeServerSession()
  const accessToken = await getAccessToken()
  const user = getPropertiesFromAccessToken(accessToken)

  // const initialComments = await getCommentsByBlueprintPackId(blueprintPackId)

  function linkify(text: string) {
    if (!text) return ''
    return text.replace(/(https:\/\/[^\s]+)/g, (url) => `<a href="${url}" class="text-main-orange underline break-all" target="_blank" rel="noopener noreferrer">${url}</a>`)
  }

  return (
    <Main classname="bg-dark-bg" dontFill>
      {/* <BlueprintOwnerSection blueprintId={blueprintId} pioneerName={blueprint.pioneerName} /> */}
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-stretch gap-2 lg:gap-4 mb-2 lg:mb-4">
        <section className="w-full lg:w-2/3 h-full">
          <div className="w-full p-3 lg:p-0 lg:h-20 flex items-center justify-center bg-black text-lg xl:text-2xl text-center text-white font-secondary font-semibold">
            {blueprintPack.title}
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between bg-light-bg p-4">
            <div className="flex flex-col items-start flex-1 gap-4 mb-4 sm:mb-0">
              <Link
                href={`/pioneers/${blueprintPack.pioneerName}`}
                className="flex flex-row items-center p-1 pr-4 rounded-full bg-dark-bg hover:bg-main-bg text-white hover:underline"
              >
                <Image
                  src={`/images/avatars/${blueprintPack.pioneerAvatar}.png`}
                  width={40}
                  height={40}
                  alt={blueprintPack.pioneerName}
                  className={`rounded-full bg-avatar-${blueprintPack.pioneerAvatarColor}`}
                />
                <p className="font-medium ml-2">{blueprintPack.pioneerName}</p>
              </Link>
              <div className="flex flex-row flex-wrap gap-4">
                {
                  blueprintPack.categories.map((category, index) => (
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
              {blueprintPack.videoUrl && (
                <a href={blueprintPack.videoUrl} className="flex flex-row items-center gap-2 py-2 px-4 rounded-full bg-dark-bg hover:bg-main-bg text-white" target="_blank" rel="noopener noreferrer">
                  <Image src="/icons/youtube-logo.svg" alt="Youtube Logo" width={24} height={24} />
                  <p className="text-gray-300">Blueprint Pack Video</p>
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
                      style={{ width: `${(blueprintPack.averageRating / 5) * 100 - 8}%` }}
                    >
                      <Star className="w-5 h-5 fill-main-orange" />
                    </div>
                  </div>

                  <p className="font-normal">( <span className="font-semibold">{blueprintPack.averageRating.toFixed(1)}</span> )</p>
                </div>
              </div>
              <div className="flex flex-row flex-grow items-center justify-between gap-4">
                <p>Created:</p>
                <p>{blueprintPack.createdAt.getDate()}/{blueprintPack.createdAt.getMonth() + 1}/{blueprintPack.createdAt.getFullYear()}</p>
              </div>
              <div className="flex flex-row flex-grow items-center justify-between gap-4">
                <p>Updated:</p>
                <p>{blueprintPack.updatedAt.getDate()}/{blueprintPack.updatedAt.getMonth() + 1}/{blueprintPack.updatedAt.getFullYear()}</p>
              </div>
              <div className="flex flex-row flex-grow items-center justify-between gap-4">
                <p>Downloads:</p>
                <div className="flex flex-row gap-1 items-center">
                  <p>{blueprintPack.downloads}</p>
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
        {/* <DownloadSection
          blueprintId={blueprintId}
          files={blueprint.files}
          pioneerName={blueprint.pioneerName}
        /> */}

        <div className="w-full lg:w-1/3 min-h-64 sm:min-h-48 hidden lg:block bg-main-bg p-4">
          <FicsitTips />
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-4 mb-2 lg:mb-4">
        <ImageCarousel images={blueprintPack.images} title={blueprintPack.title} />
        <div className="w-full lg:w-1/3 flex flex-col flex-grow gap-2 lg:gap-4">
          <RateBlueprint blueprintId={blueprintPackId} pioneerName={user?.name} />
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
      <BlueprintContainer entries={blueprintsInPack} title="Blueprints in this pack" />
      <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-4">
        {
          blueprintPack.description && (
            <div className="w-full mt-2 lg:mt-4">
              <div className="w-full h-10 sm:h-12 flex items-center bg-main-bg p-4">
                <h1 className="text-lg sm:text-xl font-medium">Description</h1>
              </div>
              <div className="w-full bg-light-bg text-gray-200 p-4">
                <div
                  className="whitespace-pre-wrap font-main"
                  dangerouslySetInnerHTML={{ __html: linkify(blueprintPack.description) }}
                />
              </div>
            </div>
          )
        }
        {/* <AdBanner classname={`w-full ${blueprint.description && "lg:w-1/3"} min-h-32 hidden lg:flex items-center justify-center bg-main-bg mt-2 lg:mt-4`}
          dataAdSlot="8546567212"
          dataFullWidthResponsive={true}
          adPadding={16}
        /> */}
      </div>
      {/* <CommentsSection initialComments={initialComments} blueprintId={blueprintId} /> */}
    </Main>
  )
}