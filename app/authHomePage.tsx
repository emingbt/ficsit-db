import Image from "next/image"
import Link from "next/link"
import DesktopAd from "../components/desktopAd"
import MobileAd from "../components/mobileAd"
import TopRatedBlueprintOfWeek from "../components/topRatedBlueprint"

export default function AuthHomePage({ pioneer }: {
  pioneer: {
    name: string,
    avatar: string,
    color: string,
  }
}) {
  return (
    <main className="w-full p-[10px] bg-dark-bg lg:p-4">
      <div className="w-full h-12 lg:h-24 flex items-center justify-between bg-main-bg mb-[10px] lg:mb-4">
        <h1 className="flex-1 text-xl lg:text-2xl text-center lg:text-start font-secondary pl-4 overflow-hidden">Hi {pioneer.name}!</h1>
        <DesktopAd fullHeight bottom />
      </div>
      <MobileAd />
      <div className="w-full sm:h-64 lg:h-96 flex flex-col sm:flex-row gap-[10px] lg:gap-4 mb-[10px] lg:mb-4">
        <TopRatedBlueprintOfWeek />
        <section className="w-full sm:w-7/12 sm:h-full relative bg-main-bg p-4">
          <h2 className="lg:text-2xl mb-3 lg:mb-4">If you want to checkout other pioneers’ blueprints</h2>
          <Link href="/blueprints" className="w-36 lg:w-48 h-8 md:h-10 lg:h-12 bg-main-orange flex items-center justify-center hover:bg-light-bg hover:text-light-orange mb-4">
            <p className="lg:text-xl">Blueprints</p>
          </Link>
          <div className="w-64 md:w-80 h-[2px] bg-main-orange mb-3 lg:mb-4" />
          <h2 className="lg:text-2xl mb-3 lg:mb-4">If you want to upload your blueprint</h2>
          <Link href="/create-blueprint" className="w-48 lg:w-56 h-8 md:h-10 lg:h-12 bg-main-orange flex items-center justify-center hover:bg-light-bg hover:text-light-orange">
            <p className="lg:text-xl">Create Blueprint</p>
          </Link>
          <div className="w-1/2 lg:w-2/3 aspect-video max-h-full bottom-0 right-0 absolute hidden lg:block">
            <Image
              src="/images/assembler.webp"
              alt="landing-page-blueprint"
              fill
              className="object-cover object-bottom"
              sizes='100%'
            />
          </div>
        </section>
      </div>
      <MobileAd onlyPhone rectangle />
      <DesktopAd fullWidth />
      <section className="w-full sm:h-32 lg:h-72 flex flex-col sm:flex-row gap-[10px] lg:gap-4 mb-[10px] lg:mb-4">
        {
          ["items", "buildings", "blueprints"].map((element, index) => {
            return (
              <div key={index} className="w-full h-48 sm:h-full relative flex items-center justify-center bg-main-bg">
                <Link href={`/${element}`}
                  className="w-28 sm:w-24 lg:w-36 xl:w-48 h-12 sm:h-10 lg:h-14 xl:h-16 z-10 bg-main-orange flex items-center justify-center hover:bg-light-bg hover:text-light-orange"
                >
                  <p className="lg:text-xl">{element.charAt(0).toUpperCase() + element.slice(1)}</p>
                </Link>
                <Image
                  src={`/images/landing-page-${element}.webp`}
                  alt={`landing-page-${element}`}
                  fill
                  className="object-cover object-center opacity-40"
                  sizes='100%'
                />
              </div>
            )
          })
        }
      </section>
      <MobileAd bottom rectangle />
      <DesktopAd bottom fullWidth />
    </main>
  )
}