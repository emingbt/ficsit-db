import Image from "next/image"
import Link from "next/link"
import Main from "../../components/Main"
import AdBanner from "../../components/AdBanner"

export default function AuthHomePage() {
  const pioneer = {
    name: "Pioneer",
    avatar: "pioneer",
    color: "blue"
  }

  const avatars = [
    "pioneer",
    "space-giraffe-tick-penguin-whale",
    "lizard-doggo",
    "small-stinger",
    "bacon-agaric",
    "beryl-nut",
    "paleberry",
    "ficsit-coffee-cup"
  ]

  const colors = [
    "gray",
    "purple",
    "indigo",
    "blue",
    "green",
    "yellow",
    "orange",
    "red"
  ]

  return (
    <Main classname="bg-dark-bg" dontFill>
      <div className="w-full h-12 lg:h-24 flex items-center justify-between bg-dark-bg mb-2 lg:mb-4 gap-4">
        <div className="w-full lg:w-5/12 h-full flex items-center justify-center bg-main-bg">
          <h1 className="w-full flex-1 text-xl lg:text-2xl text-center lg:text-start font-secondary lg:pl-4 overflow-hidden">Hi {pioneer.name}!</h1>
        </div>
        <div className="w-full lg:w-7/12 h-full hidden lg:flex items-center justify-center relative bg-main-bg">
          <AdBanner classname="w-7/12 h-full hidden lg:flex items-center justify-center"
            dataAdSlot="3454022639"
            data-full-width-responsive={true}
            dataAdFormat="fixed"
            dynamicHeight={false}
            adHeight={90}
            adPadding={16}
          />
        </div>
      </div>
      <AdBanner classname="w-full h-14 sm:h-24 flex lg:hidden items-center justify-center mb-2"
        dataAdSlot="3454022639"
        data-full-width-responsive={false}
        dataAdFormat="fixed"
        dynamicHeight={false}
        adHeight={50}
      />
      <div className="w-full sm:h-64 lg:h-96 flex flex-col sm:flex-row gap-2 lg:gap-4 mb-2 lg:mb-4">
        <section className="w-full sm:w-5/12 h-72 sm:h-full relative flex flex-col items-center justify-center bg-main-bg overflow-hidden">
          <div className="flex flex-col items-center justify-center bg-main-bg/95 shadow-sm shadow-main-orange  p-2 sm:p-4 lg:p-6 rounded-md z-20">
            <h2 className="text-sm sm:text-base lg:text-xl mb-4">Check out all Blueprint Architects</h2>
            <Link href="/pioneers" className="w-36 lg:w-48 h-8 md:h-10 lg:h-12 bg-main-orange flex items-center justify-center hover:bg-light-bg hover:text-light-orange">
              <p className="lg:text-xl">Pioneers</p>
            </Link>
          </div>
          {/* Background with the random avatars */}
          <div className="absolute w-[calc(110%)] top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap items-center justify-center opacity-35">
            {
              Array.from({ length: 64 }).map((_, index) => (
                <div key={index} className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 m-1 relative`}>
                  <Image
                    src={`/images/avatars/${avatars[Math.floor(Math.random() * avatars.length)]}.png`}
                    alt="avatar"
                    loading="lazy"
                    sizes="30%"
                    quality={10}
                    unoptimized
                    fill
                    className={`object-cover rounded-full bg-avatar-${colors[Math.floor(Math.random() * colors.length)]}`}
                  />
                </div>
              ))
            }
          </div>
        </section>
        <section className="w-full sm:w-7/12 sm:h-full relative bg-main-bg p-4">
          <h2 className="lg:text-2xl mb-3 lg:mb-4">If you want to checkout other pioneers’ blueprints</h2>
          <Link href="/blueprints" className="w-36 lg:w-48 h-8 md:h-10 lg:h-12 bg-main-orange flex items-center justify-center hover:bg-light-bg hover:text-light-orange mb-4">
            <p className="lg:text-xl">Blueprints</p>
          </Link>
          <div className="w-48 md:w-80 h-[2px] bg-main-orange mb-3 lg:mb-4" />
          <h2 className="lg:text-2xl mb-3 lg:mb-4">Explore Blueprint Packs</h2>
          <Link href="/blueprint-packs" className="w-48 lg:w-56 h-8 md:h-10 lg:h-12 bg-main-orange flex items-center justify-center hover:bg-light-bg hover:text-light-orange">
            <p className="lg:text-xl">Blueprint Packs</p>
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
      <AdBanner classname="w-full h-14 flex sm:hidden items-center justify-center mb-2"
        dataAdSlot="3813115287"
        data-full-width-responsive={false}
        dataAdFormat="fixed"
        dynamicHeight={false}
        adHeight={50}
      />
      <AdBanner classname="w-full h-24 hidden lg:flex items-center justify-center mb-4"
        dataAdSlot="3813115287"
        data-full-width-responsive={false}
        dataAdFormat="fixed"
        dynamicHeight={false}
        adHeight={90}
      />
      <section className="w-full sm:h-80 lg:h-96 3xl:h-96 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-4">
        {
          ["items", "buildings", "blueprints", "blueprint-packs"].map((element, index) => {
            return (
              <div key={index} className="w-full h-48 sm:h-full relative flex items-center justify-center bg-main-bg">
                <Link href={`/${element}`}
                  className="w-32 sm:w-30 lg:w-48 xl:w-48 h-12 sm:h-10 lg:h-14 xl:h-16 z-10 bg-main-orange flex items-center justify-center hover:bg-light-bg hover:text-light-orange"
                >
                  <p className="lg:text-xl">{
                    element === "blueprint-packs"
                      ? "Blueprint Packs"
                      : element.charAt(0).toUpperCase() + element.slice(1)
                  }</p>
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
      <AdBanner classname="w-full h-64 sm:h-40 flex items-center justify-center mt-2 lg:mt-4"
        dataAdSlot="7410397750"
        data-full-width-responsive="true"
      />
    </Main>
  )
}