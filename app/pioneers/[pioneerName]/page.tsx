import { Metadata } from "next"
import Image from "next/image"
import { getAllBlueprintsByPioneer } from "../../../services/blueprint"
import { getPioneerByName, getPioneerSocialLinks } from "../../../services/pioneer"
import Main from "../../../components/Main"
import BlueprintContainer from "../../../components/BlueprintContainer"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

const allPlatforms = [
  { slug: 'youtube', name: 'YouTube' },
  { slug: 'twitch', name: 'Twitch' },
  { slug: 'kick', name: 'Kick' },
  { slug: 'discord', name: 'Discord' },
  { slug: 'reddit', name: 'Reddit' },
  { slug: 'github', name: 'GitHub' },
]

export async function generateMetadata({ params }: { params: { pioneerName: string } }): Promise<Metadata> {
  const pioneerName = params.pioneerName
  // If pioneerName is not a string or is empty, don't fetch the pioneer
  if (typeof pioneerName !== 'string' || pioneerName.trim() === '') {
    return {
      title: "Invalid pioneer name - FicsitDB",
      description: "Invalid pioneer name",
    }
  }

  const pioneer = await getPioneerByName(pioneerName)

  return {
    title: pioneer ? `${pioneer.name} - FicsitDB` : "pioneer Not Found - FicsitDB",
    description: pioneer ? `Explore the pioneer: ${pioneer.name} in Satisfactory.` : "Pioneer not found in FicsitDB.",
  }
}

export default async function PioneerPage({ params }: { params: { pioneerName: string } }) {
  const pioneerName = params.pioneerName
  const pioneer = await getPioneerByName(pioneerName)

  if (!pioneer) {
    return (
      <Main>
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <p className='text-2xl mb-4'>Pioneer not found</p>
          <Link href="/" className='text-lg text-logo-blue hover:underline'>Go home page</Link>
        </div>
      </Main>
    )
  }

  const socialLinks = await getPioneerSocialLinks(pioneer.name)

  const blueprints = await getAllBlueprintsByPioneer(pioneerName)
  let blueprintDownloads = 0

  if (blueprints.length > 0) {
    blueprintDownloads = blueprints.reduce((acc, blueprint) => {
      return acc + blueprint.downloads
    }, 0)
  }

  return (
    <Main classname="flex flex-col bg-dark-bg">
      <div className="w-full h-16 bg-black flex sm:hidden items-center justify-center text-lg font-semibold">
        {pioneer.name}
      </div>
      <div className="w-full h-28 sm:h-48 lg:h-72 flex flex-row mb-2 lg:mb-4">
        <div className={`h-full aspect-square relative bg-avatar-${pioneer.color}`}>
          <Image
            src={`/images/avatars/${pioneer.avatar}.png`}
            alt={pioneer?.name}
            fill
            priority
          />
        </div>
        <div className="h-full w-full flex flex-1 flex-col font-medium text-sm lg:text-lg">
          <div className="w-full h-24 hidden sm:flex items-center justify-center bg-black text-lg xl:text-2xl text-center text-white font-semibold">
            {pioneer.name}
          </div>
          <div className="w-full h-full sm:h-16 flex items-center justify-between bg-main-bg px-4">
            <p>Member since:</p>
            <p>{pioneer.createdAt.getDate()}/{pioneer.createdAt.getMonth() + 1}/{pioneer.createdAt.getFullYear()}</p>
          </div>
          <div className="w-full h-full sm:h-16 flex items-center justify-between bg-light-bg px-4">
            <p>Blueprints published:</p>
            <p>{blueprints.length}</p>
          </div>
          <div className="w-full h-full sm:h-16 flex items-center justify-between bg-main-bg px-4">
            <p>Blueprint downloads:</p>
            <p>{blueprintDownloads}</p>
          </div>
        </div>
        {/* <AdBanner classname="h-full w-[336px] 3xl:w-[768px] hidden lg:flex items-center justify-center ml-4"
          dataAdSlot="3904614625"
          dataFullWidthResponsive={false}
          adHeight={280}
          adPadding={4}
        /> */}
      </div>
      {
        socialLinks.length > 0 &&
        <div className="w-full flex flex-col mb-2 lg:mb-4">
          <div className="w-full h-10 sm:h-12 flex items-center justify-between bg-main-bg p-4">
            <h1 className="text-base sm:text-lg font-medium">Social Links</h1>
          </div>
          <div className="w-full overflow-x-auto flex flex-1 flex-row items-center gap-2 p-2 bg-light-bg text-sm lg:text-base">
            {socialLinks.map((link) => (
              <a key={link.platform} href={link.url} className="flex flex-shrink-0 flex-row items-center gap-2 py-2 px-4 rounded-full bg-dark-bg hover:bg-main-bg text-white" target="_blank" rel="noopener noreferrer">
                <Image src={`/icons/${link.platform}-logo.svg`} alt={`${link.platform} Logo`} width={24} height={24} />
                <p className="text-gray-300">{allPlatforms.find(p => p.slug === link.platform)?.name || link.platform}</p>
                <ExternalLink className="text-gray-300" width={16} height={16} />
              </a>
            ))}
          </div>
        </div>
      }
      {/* <AdBanner classname="w-full h-[50px] sm:h-[90px] flex lg:hidden items-center justify-center mb-2"
        dataAdSlot="3904614625"
        dataFullWidthResponsive={false}
        dataAdFormat="fixed"
        dynamicHeight={false}
      /> */}
      <BlueprintContainer blueprints={blueprints} title="Blueprints" />
    </Main>
  )
}