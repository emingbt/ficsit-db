'use client'

import Image from 'next/image'
import ResetPasswordForm from '../../../../components/forms/resetPasswordForm'

export default function ForgotPasswordPage({ params }: { params: { resetToken: string } }) {
  const token = params.resetToken

  return (
    <main className='w-full h-base xl:h-base-lg p-[10px] lg:p-4 bg-dark-bg'>
      <div className='w-full h-full flex flex-row bg-main-bg'>
        <div className='w-full lg:w-1/2 xl:max-w-lg flex flex-col lg:justify-center p-6 lg:p-16 font-secondary'>
          <h1 className='text-2xl lg:text-4xl mb-4 lg:mb-1'>Reset Password</h1>
          <p className=' text-xs lg:text-base mb-4 text-main-gray'>Enter your new password.</p>
          <ResetPasswordForm token={token} />
        </div>
        <div className="hidden lg:flex lg:w-1/2 xl:w-full h-full relative">
          <Image
            src="/images/reset-password-banner.png"
            alt="reset-password-page"
            fill
            className="object-cover object-right w-full h-full"
            sizes='100%'
          />
        </div>
      </div>
    </main>
  )
}