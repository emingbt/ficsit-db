import Image from 'next/image'
import LoginForm from '../../components/forms/loginForm'

export default function LoginPage() {
  return (
    <main className=' w-full h-base xl:h-base-lg p-[10px] lg:p-4 bg-dark-bg'>
      <div className='w-full h-full flex flex-row bg-main-bg'>
        <div className='w-full lg:w-1/2 xl:max-w-lg flex flex-col lg:justify-center p-6 lg:p-16 font-secondary'>
          <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Login</h1>
          <p className=' text-xs lg:text-base mb-4 text-main-gray'>Welcome back pioneer!</p>
          <LoginForm />
        </div>
        <div className="hidden lg:flex lg:w-1/2 xl:w-full relative">
          <Image
            src="/images/login-banner.png"
            alt="login-page"
            fill
            className="object-cover object-center w-full h-full"
            sizes='100%'
          />
        </div>
      </div>
    </main>
  )
}