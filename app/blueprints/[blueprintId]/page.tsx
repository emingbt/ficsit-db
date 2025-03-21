import Link from "next/link"
import Image from "next/image"
import RateBlueprint from "./rateBlueprint"
import DownloadSection from "./downloadSection"
import ImageCarousel from "../../../components/ImageCarousel"
import { getBlueprintById } from "../../../services/blueprint"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPropertiesFromAccessToken } from "../../../utils/kinde"
import Main from "../../../components/Main"
import { Download, Star } from "lucide-react"
import AdBanner from "../../../components/AdBanner"

export default async function BlueprintPage({ params }: { params: { blueprintId: string } }) {
  const blueprintId = parseInt(params.blueprintId)
  const blueprint = await getBlueprintById(blueprintId)

  const { getAccessToken } = getKindeServerSession()
  const accessToken = await getAccessToken()
  const user = getPropertiesFromAccessToken(accessToken)

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

  return (
    <Main classname="bg-dark-bg" dontFill>
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-stretch gap-2 lg:gap-4 mb-2 lg:mb-4">
        <section className="w-full lg:w-2/3 h-full">
          <div className="w-full p-3 lg:p-0 lg:h-20 flex items-center justify-center bg-black text-lg xl:text-2xl text-center text-white font-semibold">
            {blueprint.title}
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between bg-light-bg p-4">
            <div className="flex flex-col flex-1 gap-4 mb-4 sm:mb-0">
              <Link
                href={`/pioneers/${blueprint.pioneerName}`}
                className="w-32 flex flex-row items-center p-1 pr-4 rounded-full bg-dark-bg hover:bg-main-bg text-white hover:underline"
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
            </div>
            <div className="flex flex-col gap-4 font-semibold text-gray-200">
              <div className="flex flex-row flex-grow items-center justify-between gap-4">
                <p>Rating:</p>
                <div className="flex flex-row gap-1">
                  <div className="flex flex-row gap-1">
                    {
                      Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          color={index < blueprint.averageRating ? 'bg-main-orange' : 'bg-main-bg'}
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${index < blueprint.averageRating ? 'fill-main-orange' : 'fill-main-bg'}`}
                        />
                      ))
                    }
                  </div>
                  <p className="font-normal">( <span className="font-semibold">{blueprint.averageRating}</span> )</p>
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
        <AdBanner classname="w-full h-14 flex lg:hidden items-center justify-center"
          dataAdSlot="8715388606"
          dataFullWidthResponsive={false}
          dataAdFormat="fixed"
          dynamicHeight={false}
          adHeight={50}
        />
        <DownloadSection id={blueprintId} files={blueprint.files} downloads={blueprint.downloads} averageRating={blueprint.averageRating} />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-4 mb-2 lg:mb-4">
        <ImageCarousel images={blueprint.images} title={blueprint.title} />
        <div className="w-full lg:w-1/3 flex flex-col flex-grow gap-2 lg:gap-4">
          <RateBlueprint blueprintId={blueprintId} pioneerName={user?.name} />
          <AdBanner classname="w-full h-full hidden lg:flex items-center justify-center"
            dataAdSlot="8715388606"
            dataFullWidthResponsive={true}
            dynamicHeight={false}
            adPadding={16}
          />
          <AdBanner classname="w-full min-h-64 flex lg:hidden items-center justify-center"
            dataAdSlot="8715388606"
            dataFullWidthResponsive={false}
          />
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-4">
        {
          blueprint.description && (
            <div className="w-full lg:w-2/3 bg-light-bg text-gray-200 p-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <div className="w-full h-[1px] bg-gray-500 shadow-md my-1" />
              <pre className="whitespace-pre-wrap font-main">{blueprint.description}</pre>
            </div>
          )
        }
        <AdBanner classname={`w-full ${blueprint.description && "lg:w-1/3"} min-h-32 hidden lg:flex items-center justify-center bg-main-bg`}
          dataAdSlot="4926949738"
          dataFullWidthResponsive={true}
          adPadding={16}
        />
      </div>
    </Main>
  )
}