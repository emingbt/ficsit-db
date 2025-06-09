import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

export default function Footer() {
  return (
    <footer className='w-full flex flex-col bg-dark-bg px-8 font-secondary'>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-4">
        <div className="flex flex-col sm:flex-row text-gray-600 mb-4 sm:mb-0 items-start sm:items-center">
          <p className=" font-logo">FiCS<span className="-ml-[2px]">I</span><span className="-ml-[5px]">T</span> DB</p>
          {/* <p className="font-logo ml-2">v1.0</p> */}
          <p className="font-medium sm:ml-2">Built by pioneer for pioneers.</p>
        </div>
        <Link
          href="https://www.github.com/emingbt/ficsit-db"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="group flex items-center text-sm xl:text-base p-2 rounded-full bg-main-bg transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg outline outline-2 outline-offset-2 outline-gray-600"
        >
          <Image
            src="/icons/github-logo.svg"
            alt="GitHub"
            width={24}
            height={24}
            className="fill-gray-600 transition-colors duration-300"
          />
          <p className="ml-4 text-gray-600 font-medium transition-colors duration-300 group-hover:text-gray-400">
            Give a star!
          </p>
          <Star
            className="text-gray-600 fill-gray-600 ml-2 transition-colors duration-300 group-hover:text-main-orange group-hover:fill-main-orange animate-pulse group-hover:animate-none"
            size={16}
          />
        </Link>
      </div>
      <div className="w-full mb-4">
        <Link href={"/faq"} className="text-main-orange font-medium">FAQ</Link>
      </div>
      <div className='w-full h-0.5 bg-main-orange mb-6' />
      <p className="w-full text-main-gray min-h-16 mb-6 text-xs">
        The assets comes from Satisfactory or from websites created and owned by Coffee Stain Studios, who hold the copyright of Satisfactory.
        <br />
        All trademarks and registered trademarks present in the image are proprietary to Coffee Stain Studios. | <Link href="/privacy-policy" className='text-main-orange hover:text-light-orange hover:underline'>Privacy Policy</Link>
      </p>
    </footer>
  )
}