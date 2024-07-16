'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signupSchema } from '../../utils/zod'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmailError('')
    setUsernameError('')
    setPasswordError('')

    try {
      signupSchema.parse({ email, username, password })

      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })

      const data = await response.json()

      if (response.status !== 201) {
        if (data.cause === 'emailTaken') {
          setEmailError(data.message)
        }
        else if (data.cause === 'usernameTaken') {
          setUsernameError(data.message)
        }
        return
      }
      else {

      }

    } catch (error) {
      if (error.name === 'ZodError') {
        error.errors.map((err: any) => {
          if (err.path[0] === 'email') {
            setEmailError(err.message)
          }
          if (err.path[0] === 'username') {
            setUsernameError(err.message)
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
          `w-full h-8 lg:h-10 p-2 ${!emailError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!emailError ? 'main-orange' : 'error'}
          ${emailError && 'border-b-2 border-error'}`
        }
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {
        emailError && <p className='w-full text-xs lg:text-base text-error'>{emailError}</p>
      }
      <label className='w-full text-xs lg:text-base lg:mb-2'>Username</label>
      <input
        id='username'
        type='text'
        className={
          `w-full h-8 lg:h-10 p-2 ${!usernameError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!usernameError ? 'main-orange' : 'error'}
          ${usernameError && 'border-b-2 border-error'}`
        }
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {
        usernameError && <p className='w-full text-xs lg:text-base text-error'>{usernameError}</p>
      }
      <label className='w-full text-xs lg:text-base lg:mb-2'>Password</label>
      <input
        id='password'
        type='password'
        className={
          `w-full h-8 lg:h-10 p-2 ${!passwordError && 'mb-6 lg:mb-10'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!emailError ? 'main-orange' : 'error'}
          ${emailError && 'border-b-2 border-error'}`
        }
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {
        passwordError && <p className='w-full text-xs lg:text-base text-error mb-4 '>{passwordError}</p>
      }
      <button
        type='submit'
        className='w-full h-8 lg:h-10 text-base mb-4 bg-main-orange hover:bg-light-bg hover:text-light-orange'
      >
        Signup
      </button>
      <p className='w-full text-xs lg:text-base'>
        Already have an account? <Link href="/auth/login"><span className='text-main-orange hover:underline cursor-pointer'>Login</span></Link>
      </p>
    </form>
  )
}
