import Image from 'next/image'
import ForgotPasswordForm from '../../../components/forms/forgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <main className='w-full h-base xl:h-base-lg p-[10px] lg:p-4 bg-dark-bg'>
      <div className='w-full h-full flex flex-row bg-main-bg'>
        <div className='w-full lg:w-1/2 xl:max-w-lg flex flex-col lg:justify-center p-6 lg:p-16 font-secondary'>
          <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Forgot Password</h1>
          <p className=' text-xs lg:text-base mb-4 text-main-gray'>Send a password renew link to your email.</p>
          <ForgotPasswordForm />
        </div>
        <div className="hidden lg:flex lg:w-1/2 xl:w-full h-full relative">
          <Image
            src="/images/forgot-password-banner.png"
            alt="forgot-password-page"
            fill
            className="object-cover object-right w-full h-full"
            sizes='100%'
          />
        </div>
      </div>
    </main>
  )
}