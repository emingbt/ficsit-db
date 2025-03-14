import Image from "next/image"

export default function Main({ children, classname, image, imagePosition }: { children: React.ReactNode, classname?: string, image?: string, imagePosition?: string }) {
  const isDivided: boolean = !!image

  return (
    <div className="w-full min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-128px)] flex items-stretch border-8 lg:border-[1rem] border-dark-bg">
      <main className={`w-full ${isDivided ? "lg:w-1/2" : ""} ${classname}`}>
        {children}
      </main>
      {/* Image that fills the remaining space (flex-1) */}
      {isDivided && image && (
        <div className="flex-1 hidden lg:block relative">
          <Image
            src={`/images/${image}.webp`}
            alt={image}
            fill
            className="object-cover object-left w-full h-full"
            sizes="100%"
            priority
            style={{ objectPosition: imagePosition || "center" }}
          />
        </div>
      )}
    </div>

  )
}