import Image from "next/image"

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col items-center p-5'>
      <main className="w-full p-[10px] bg-dark-bg">
        <section className="w-full h-[34rem] lg:h-screen flex flex-row items-center bg-main-bg">
          <div className="w-full lg:w-1/2 flex flex-col p-4 font-bold font-secondary md:p-16">
            <h1 className="text-4xl mb-2 lg:text-5xl">Hi Pioneer!</h1>
            <p className="text-xs text-main-gray mb-8 lg:text-lg">Welcome to Ficsit DB pioneer guidance system.</p>
            <div className="w-full xl:max-w-md flex flex-row items-center justify-between">
              <button className="w-full max-w-[16rem] h-8 lg:h-10 bg-main-orange font-main font-normal hover:bg-light-bg">Sign up</button>
              <p className="px-4 text-main-gray">or</p>
              <button className="w-full max-w-[16rem] h-8 lg:h-10 bg-main-orange font-main font-normal hover:bg-light-bg">Login</button>
            </div>
          </div>
          <div className="hidden lg:flex w-1/2 h-full bg-red-400 relative">
            <Image
              src="/images/landing-page.png"
              alt="landing-page"
              fill
              className="object-cover object-center w-full h-full"
            />
          </div>
        </section>
      </main>
    </div>
  )
}