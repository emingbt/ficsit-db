'use client'

import { useState } from 'react'
import Link from 'next/link'
import { loginSchema } from '../../utils/zod'
// import { useUserStore } from '../../utils/zustand'

export default function LoginForm() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:8000'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submitted')
    e.preventDefault()
    setEmailError('')
    setPasswordError('')

    try {
      loginSchema.parse({ email, password })

      // const response = await fetch(`${baseUrl}/login`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     getSetCookie: 'true'
      //   },
      //   body: JSON.stringify({ email, password })
      // })
      console.log('Sending request')
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      console.log('Sent request', response, "data", data)

      if (response.status !== 200) {
        console.error('There is an error', data.message)
        return
      } else {
        console.log('Successfull', data, data.body)
        // Set the user in the store
        // useUserStore.setState({ user: data.user })

        // Redirect to the homepage
        // window.location.href = '/'
      }
    } catch (error) {
      console.error(error)
      if (error.name === 'ZodError') {
        error.errors.map((err: any) => {
          if (err.path[0] === 'email') {
            setEmailError(err.message)
          }
          if (err.path[0] === 'password') {
            setPasswordError(err.message)
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
      <label className='w-full text-xs lg:text-base lg:mb-2'>Password</label>
      <input
        id='password'
        type='password'
        className={`w-full h-8 lg:h-10 p-2 ${!passwordError && 'mb-4 lg:mb-6'} bg-light-bg text-white rounded-none outline-none focus:border-b-2 border-${!emailError ? 'main-orange' : 'error'} ${passwordError && 'border-b-2 border-error'}`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {
        passwordError && <p className='w-full text-xs lg:text-base text-error'>{passwordError}</p>
      }
      <div className='w-full flex flex-row-reverse mb-6'>
        <Link href='/auth/forgot-password' >
          <p className='text-xs lg:text-base text-main-gray hover:text-light-orange'>Forgot password?</p>
        </Link>
      </div>
      <button
        type='submit'
        className='w-full h-8 lg:h-10 text-base mb-4 bg-main-orange hover:bg-light-bg hover:text-light-orange'
      >
        Login
      </button>
      <p className='w-full text-xs lg:text-base'>
        Don&#39;t have an account? <Link href="/auth/signup"><span className='text-main-orange hover:underline cursor-pointer'>Create an account</span></Link>
      </p>
    </form>
  )
}
