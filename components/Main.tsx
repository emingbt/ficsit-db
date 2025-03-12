import Image from "next/image"

export default function Main({ children, classname, image }: { children: React.ReactNode, classname?: string, image?: string }) {
  const isDivided: boolean = !!image

  return (
    <div className="w-full min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-128px)] flex items-stretch border-8 lg:border-[1rem] border-dark-bg">
      <main className={`w-full ${isDivided ? "lg:w-1/2" : ""} ${classname}`}>
        {children}
      </main>
      {isDivided && image && (
        <div className="w-1/2 h-auto hidden lg:block relative">
          <Image
            src={`/images/${image}.webp`}
            alt={image}
            fill
            className="object-cover object-left w-full h-full"
            sizes="100%"
            priority
          />
        </div>
      )}
    </div>

  )
}