import Image from "next/image"
import Link from "next/link"
import Main from "../components/Main"
import AuthLinks from "../components/AuthLinks"

export default async function NonAuthHomePage() {
  return (
    <Main>
      <section className="w-full h-[34rem] lg:h-[calc(100vh-6.25rem)] xl:h-[calc(100vh-7rem)] flex flex-row items-center bg-main-bg">
        <div className="w-full lg:w-1/2 flex flex-col p-4 font-bold font-secondary md:p-16">
          <h1 className="text-4xl mb-2 lg:text-5xl">Hi Pioneer!</h1>
          <p className="text-xs text-main-gray mb-8 lg:text-lg">Welcome to Ficsit DB pioneer guidance system.</p>
          <AuthLinks />
        </div>
        <div className="hidden lg:flex w-1/2 h-full relative">
          <Image
            src="/images/landing-page.webp"
            alt="landing-page"
            fill
            className="object-cover object-center w-full h-full"
            sizes='100%'
            priority
          />
        </div>
      </section>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-main-bg font-bold font-secondary">
        <div className="w-full order-1 aspect-square relative">
          <Image
            src="/images/landing-page-items.webp"
            alt="landing-page-items"
            fill
            className="object-cover object-center w-full h-full"
            sizes='100%'
          />
        </div>
        <div className="w-full order-2 aspect-square p-8 flex flex-col justify-center">
          <p className="w-full text-xl mb-6 lg:text-3xl">You can check items and the recipes to learn how to produce them.</p>
          <Link href="/items">
            <button className="w-2/5 h-8 bg-main-orange text-sm lg:h-10 lg:text-lg lg:hover:bg-light-bg  lg:hover:text-light-orange">Items</button>
          </Link>
        </div>
        <div className="w-full order-4 md:order-3 aspect-square p-8 flex flex-col justify-center">
          <p className="w-full text-xl mb-6 lg:text-3xl">Also, you can check buildings, which items you can produce on them and how much power they use or produce.</p>
          <Link href="/buildings?category=production">
            <button className="w-2/5 h-8 bg-main-orange text-sm lg:h-10 lg:text-lg lg:hover:bg-light-bg  lg:hover:text-light-orange">Buildings</button>
          </Link>
        </div>
        <div className="w-full order-3 md:order-4 aspect-square relative">
          <Image
            src="/images/landing-page-buildings.webp"
            alt="landing-page-buildings"
            fill
            className="object-cover object-center w-full h-full"
            sizes='100%'
          />
        </div>
        <div className="w-full order-5 aspect-square relative">
          <Image
            src="/images/landing-page-blueprints.webp"
            alt="landing-page-blueprints"
            fill
            className="object-cover object-center w-full h-full"
            sizes='100%'
          />
        </div>
        <div className="w-full order-6 aspect-square p-8 flex flex-col justify-center">
          <p className="w-full text-xl mb-6 lg:text-3xl">And you can use other pioneers’ blueprints to improve your production line.</p>
          <Link href="/blueprints">
            <button className="w-2/5 h-8 bg-main-orange text-sm lg:h-10 lg:text-lg lg:hover:bg-light-bg  lg:hover:text-light-orange">Blueprints</button>
          </Link>
        </div>
      </section>
    </Main>
  )
}