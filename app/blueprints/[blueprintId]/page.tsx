import Link from "next/link"
import Image from "next/image"
import RateBlueprint from "./rateBlueprint"
import DownloadSection from "./downloadSection"
import ImageCarousel from "../../../components/imageCarousel"
import { getBlueprintById } from "../../../services/blueprint"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPropertiesFromAccessToken } from "../../../utils/kinde"
import AdBanner from "../../../components/adBanner"

export default async function BlueprintPage({ params }: { params: { blueprintId: string } }) {
  const blueprintId = parseInt(params.blueprintId)
  const blueprint = await getBlueprintById(blueprintId)

  const { getAccessToken } = getKindeServerSession()
  const accessToken = await getAccessToken()
  const user = getPropertiesFromAccessToken(accessToken)

  if (!blueprint) {
    return (
      <main className="w-full h-full bg-dark-bg p-[10px] lg:p-4">
        <div className='w-full min-h-content lg:min-h-content-lg xl:min-h-content-xl flex items-center justify-center bg-main-bg'>
          <p className="text-xl">Blueprint not found</p>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full h-full bg-dark-bg p-[10px] lg:p-4">
      <div className='w-full min-h-content lg:min-h-content-lg xl:min-h-content-xl flex flex-col bg-main-bg'>
        <div className="w-full lg:h-96 xl:h-[480px] flex flex-col lg:flex-row">
          <ImageCarousel images={blueprint.images} title={blueprint.title} />
          <div className="w-full lg:w-80 xl:w-[570px] h-full flex flex-col">
            <div className="w-full p-3 lg:p-0 lg:h-20 flex items-center justify-center bg-logo-blue text-lg xl:text-2xl text-center text-white font-semibold">
              {blueprint.title}
            </div>
            <div className="w-full h-16 flex flex-row items-center justify-center bg-light-bg">
              <Link
                href={`/pioneers/${blueprint.pioneerName}`}
                className="flex flex-row items-center text-white hover:underline"
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
            </div>
            <div className="w-full h-16 flex flex-row items-center justify-center gap-4">
              {
                blueprint.categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/blueprints?category=${category}`}
                    className="text-gray-300 hover:text-logo-blue"
                  >
                    <div className="flex items-center justify-center p-2 bg-light-bg">
                      <p className="text-sm font-semibold">{category}</p>
                    </div>
                  </Link>
                ))
              }
            </div>
            <div className="w-full h-[50px] md:h-[90px] bg-black flex lg:hidden items-center justify-center">
              Ad
            </div>
            <div className="w-full h-72 flex flex-1 bg-light-bg">
              <div className="w-full lg:h-full flex xl:flex-1 flex-col">
                <div className="w-full h-16 lg:h-full flex lg:flex-1 lg:flex-col items-center justify-center gap-4 p-3 xl:px-8 text-sm lg:text-base font-semibold text-center">
                  <p>Created At {blueprint.createdAt.getDate()}/{blueprint.createdAt.getMonth()}/{blueprint.createdAt.getFullYear()}</p>
                  <div className="w-[2px] h-full lg:w-full lg:h-[2px] bg-logo-blue" />
                  <p>Updated At {blueprint.updatedAt.getDate()}/{blueprint.updatedAt.getMonth()}/{blueprint.updatedAt.getFullYear()}</p>
                </div>
                <RateBlueprint blueprintId={blueprintId} pioneerName={user?.name} />
              </div>
              <div className="h-full w-[336px] hidden xl:flex items-center justify-center bg-black">
                Ad
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:h-56 xl:h-48 flex flex-col-reverse lg:flex-row">
          {blueprint.description ?
            <>
              <div className="w-full h-full bg-light-bg flex flex-1 items-center p-4">
                {blueprint.description}
              </div>
              <div className="w-full h-[50px] md:h-[90px] flex lg:hidden items-center justify-center bg-black">
                Ad
              </div>
            </> :
            // If there is no description, display a ad
            <div className="w-full h-[50px] md:h-[90px] lg:h-full bg-black flex lg:flex-1 items-center justify-center">
              Ad
            </div>
          }
          <DownloadSection id={blueprintId} files={blueprint.files} downloads={blueprint.downloads} averageRating={blueprint.averageRating} />
        </div>
        <div className="w-full h-[50px] lg:h-24 flex items-center justify-center bg-black">
          <AdBanner dataAdSlot="5085063532" />
        </div>
      </div>
    </main >
  )
}