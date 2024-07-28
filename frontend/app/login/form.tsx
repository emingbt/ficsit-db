'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { login } from './action'
import Link from 'next/link'

export default function LoginForm() {
  const [state, action] = useFormState(login, undefined)

  const emailError = state?.error?.email
  const passwordError = state?.error?.password

  return (
    <form action={action} className='w-full flex flex-col items-center'>
      <label htmlFor='email' className='w-full text-xs lg:text-base lg:mb-2'>Email</label>
      <input
        id='email'
        name='email'
        placeholder='pioneer@example.com'
        type='text'
        className={
          `w-full h-8 lg:h-10 p-2 ${!emailError && 'mb-4 lg:mb-6'} bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!emailError ? 'main-orange' : 'error'}
          ${emailError && 'border-b-2 border-error'}`
        }
      />
      {
        emailError && <p className='w-full text-xs lg:text-base text-error'>{emailError}</p>
      }
      <label htmlFor='password' className='w-full text-xs lg:text-base lg:mb-2'>Password</label>
      <input
        id='password'
        name='password'
        type='password'
        className={`w-full h-8 lg:h-10 p-2 ${!passwordError && 'mb-4 lg:mb-6'} bg-light-bg text-white rounded-none outline-none focus:border-b-2 border-${!emailError ? 'main-orange' : 'error'} ${passwordError && 'border-b-2 border-error'}`}
      />
      {
        passwordError &&
        <div className="w-full text-xs lg:text-base text-error mb-4">
          <p>Password must:</p>
          <ul>
            {passwordError.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      }
      <div className='w-full flex flex-row-reverse mb-6'>
        <Link href='/forgot-password' >
          <p className='text-xs lg:text-base text-main-gray hover:text-light-orange'>Forgot password?</p>
        </Link>
      </div>
      <LoginButton />
      <p className='w-full text-xs lg:text-base'>
        Don&#39;t have an account? <Link href="/signup"><span className='text-main-orange hover:underline cursor-pointer'>Create an account</span></Link>
      </p>
    </form>
  )
}

export function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      className={`
        w-full h-8 lg:h-10 text-base mb-4
        ${pending ? 'bg-light-bg  text-light-orange' : 'bg-main-orange'}
        hover:bg-light-bg hover:text-light-orange
      `}
    >
      {pending ? 'Submitting...' : 'Login'}
    </button>
  )
}
