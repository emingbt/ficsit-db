import Main from "../../components/Main"

export default function Deprecated() {
  return (
    <Main classname="p-2 lg:p-4 flex flex-col items-center justify-center sm:text-lg text-left font-secondary">
      <div>
        <h1 className="text-lg sm:text-2xl font-bold">
          Yes, I know it is <span className="text-error">deprecated</span>
        </h1>
        <br />
        <p>
          Satisfactory 1.0 is released 🎉 and there are lots of new things.
        </p>
        <p>
          But I&apos;m still at the university and in the last year.
        </p>
        <p>
          Right now, I&apos;m working on my graduation project, so I don&apos;t have too much free time.
        </p>
        <p>
          I&apos;ll try to update the website as soon as possible.
        </p>
        <br />
        <p className="text-main-orange">Thank you for your understanding.</p>
        <p>
          - emingbt
        </p>
      </div>
    </Main>
  )
}