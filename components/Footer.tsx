import Link from "next/link"

export default function Footer() {
  return (
    <footer className='w-full flex flex-col bg-dark-bg px-8 font-secondary'>
      <div className="w-full h-20 flex items-center justify-center">
        <p className="text-sm xl:text-base">
          Built by <Link
            href="https://www.github.com/emingbt"
            className='text-main-orange hover:text-light-orange hover:underline'
          >emingbt</Link>
        </p>
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