export default function Deprecated() {
  return (
    <main className="w-full h-1 min-h-content lg:min-h-content-lg xl:min-h-content-xl bg-dark-bg p-[10px] lg:p-4">
      <div className="w-full h-full flex flex-col items-center justify-center bg-main-bg p-[10px] lg:p-4 sm:text-lg text-left font-secondary">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold">
            Yes, I know it is <span className="text-error">deprecated</span>
          </h1>
          <br />
          <p>
            Satisfactory 1.0 is released 🎉 and there are lots of new things.
          </p>
          <p>
            But I'm still at the university and in the last year.
          </p>
          <p>
            Right now, I'm working on my graduation project, so I don't have too much free time.
          </p>
          <p>
            I'll try to update the website as soon as possible.
          </p>
          <br />
          <p className="text-main-orange">Thank you for your understanding.</p>
          <p>
            - emingbt
          </p>
        </div>
      </div>
    </main >
  )
}