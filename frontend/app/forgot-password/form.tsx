'use client'

import { useState } from 'react'
import { ForgotPasswordFormSchema } from '../../utils/zod'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmailError('')

    try {
      ForgotPasswordFormSchema.parse({ email })

      const response = await fetch('http://localhost:8000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.status !== 200) {
        if (data.cause === 'emailNotFound') {
          setEmailError(data.message)
        }
        return
      }
      else {
        console.log('Password reset link sent to your email.')
      }

    } catch (error) {
      if (error.name === 'ZodError') {
        error.errors.map((err: any) => {
          if (err.path[0] === 'email') {
            setEmailError(err.message)
          }
        })
      }
    }
  }

  return (
    <form className='w-full flex flex-col items-center' onSubmit={handleOnSubmit}>
      <label className='w-full text-xs lg:text-base lg:mb-2'>Email</label>
      <input
        id='email'
        type='text'
        className={
          `w-full h-8 lg:h-10 p-2 ${!emailError && 'mb-4 lg:mb-6'} bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!emailError ? 'main-orange' : 'error'}
          ${emailError && 'border-b-2 border-error'}`
        }
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {
        emailError && <p className='w-full text-xs lg:text-base text-error'>{emailError}</p>
      }
      <button
        type='submit'
        className='w-full h-8 lg:h-10 text-base mb-4 bg-main-orange hover:bg-light-bg hover:text-light-orange'
      >
        Reset Password
      </button>
    </form>
  )
}