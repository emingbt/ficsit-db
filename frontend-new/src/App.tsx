function App() {
  return (
    <main className="w-full p-[10px] bg-dark-bg lg:p-5 text-white">
      <section className="w-full h-[34rem] lg:h-screen flex flex-row items-center bg-main-bg">
        <div className="w-full lg:w-1/2 flex flex-col p-4 font-bold font-secondary md:p-16">
          <h1 className="text-4xl mb-2 lg:text-5xl">Hi Pioneer!</h1>
          <p className="text-xs text-main-gray mb-8 lg:text-lg">Welcome to Ficsit DB pioneer guidance system.</p>
          <div className="w-full xl:max-w-md flex flex-row items-center justify-between">
            <a href={'/items'}
              className="w-full max-w-[16rem] h-8 lg:h-10 flex items-center justify-center bg-main-orange font-main font-normal lg:hover:bg-light-bg  lg:hover:text-light-orange">
              Items
            </a>
            <p className="px-4 text-main-gray">or</p>
            <a href={'/buildings'}
              className="w-full max-w-[16rem] h-8 lg:h-10 flex items-center justify-center bg-main-orange font-main font-normal lg:hover:bg-light-bg  lg:hover:text-light-orange">
              Buildings
            </a>
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 h-full relative">
          <img
            src="/images/landing-page.png"
            alt="landing-page"
            className="object-cover object-center w-full h-full"
            sizes='100%'
          />
        </div>
      </section>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-main-bg font-bold font-secondary">
        <div className="w-full order-1 aspect-square relative">
          <img
            src="/images/landing-page-items.jpg"
            alt="landing-page-items"
            className="object-cover object-center w-full h-full"
            sizes='100%'
          />
        </div>
        <div className="w-full order-2 aspect-square p-8 flex flex-col justify-center">
          <p className="w-full text-xl mb-6 lg:text-3xl">You can check items and the recipes to learn how to produce them.</p>
          <a href="/items">
            <button className="w-2/5 h-8 bg-main-orange text-sm lg:h-10 lg:text-lg lg:hover:bg-light-bg  lg:hover:text-light-orange">Items</button>
          </a>
        </div>
        <div className="w-full order-4 md:order-3 aspect-square p-8 flex flex-col justify-center">
          <p className="w-full text-xl mb-6 lg:text-3xl">Also, you can check buildings, which items you can produce on them and how much power they use or produce.</p>
          <a href="/buildings?category=production">
            <button className="w-2/5 h-8 bg-main-orange text-sm lg:h-10 lg:text-lg lg:hover:bg-light-bg  lg:hover:text-light-orange">Buildings</button>
          </a>
        </div>
        <div className="w-full order-3 md:order-4 aspect-square relative">
          <img
            src="/images/landing-page-buildings.png"
            alt="landing-page-buildings"
            className="object-cover object-center w-full h-full"
            sizes='100%'
          />
        </div>
        <div className="w-full order-5 aspect-square relative">
          <img
            src="/images/landing-page-blueprints.png"
            alt="landing-page-blueprints"
            className="object-cover object-center w-full h-full"
            sizes='100%'
          />
        </div>
        <div className="w-full order-6 aspect-square p-8 flex flex-col justify-center">
          <p className="w-full text-xl mb-6 lg:text-3xl">And you can use other pioneers’ blueprints to improve your production line.</p>
          <a href="/blueprints">
            <button className="w-2/5 h-8 bg-main-orange text-sm lg:h-10 lg:text-lg lg:hover:bg-light-bg  lg:hover:text-light-orange">Blueprints</button>
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
