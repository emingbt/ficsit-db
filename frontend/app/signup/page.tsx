import Image from 'next/image'
import SignupForm from '../../components/forms/singupForm'

export default function SignupPage() {
  return (
    <main className=' w-full h-base xl:h-base-lg p-[10px] lg:p-4 bg-dark-bg'>
      <div className='w-full h-full flex flex-row bg-main-bg'>
        <div className='w-full lg:w-1/2 xl:max-w-lg flex flex-col lg:justify-center p-6 lg:p-16 font-secondary'>
          <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Sign up</h1>
          <p className=' text-xs lg:text-base mb-4 text-main-gray'>Become a Ficsit pioneer!</p>
          <SignupForm />
        </div>
        <div className="hidden lg:flex lg:w-1/2 xl:w-full h-full relative">
          <Image
            src="/images/signup-banner.png"
            alt="signup-page"
            fill
            className="object-cover object-right w-full h-full"
            sizes='100%'
          />
        </div>
      </div>
    </main>
  )
}