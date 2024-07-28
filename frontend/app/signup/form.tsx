'use client'

import { useFormState, useFormStatus } from 'react-dom'
import Link from 'next/link'
import { signup } from './action'

export default function SignupForm() {
  const [state, action] = useFormState(signup, undefined)

  let emailError = state?.error?.email
  let nameError = state?.error?.name
  let passwordError = state?.error?.password

  return (
    <form action={action} className='w-full flex flex-col items-center'>
      <label htmlFor='email' className='w-full text-xs lg:text-base lg:mb-2'>Email</label>
      <input
        id='email'
        type='text'
        name='email'
        placeholder='pioneer@example.com'
        className={
          `w-full h-8 lg:h-10 p-2 ${!emailError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!emailError ? 'main-orange' : 'error'}
          ${emailError && 'border-b-2 border-error'}`
        }
      />
      {
        emailError && <p className='w-full text-xs lg:text-base text-error'>{emailError}</p>
      }
      <label htmlFor='name' className='w-full text-xs lg:text-base lg:mb-2'>Name</label>
      <input
        id='name'
        type='text'
        name='name'
        placeholder='pi0neer'
        className={
          `w-full h-8 lg:h-10 p-2 ${!nameError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!nameError ? 'main-orange' : 'error'}
          ${nameError && 'border-b-2 border-error'}`
        }
      />
      {
        nameError &&
        <div className="w-full text-xs lg:text-base text-error mb-4">
          <p>Name must:</p>
          <ul>
            {nameError.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      }
      <label className='w-full text-xs lg:text-base lg:mb-2'>Password</label>
      <input
        id='password'
        name='password'
        type='password'
        className={
          `w-full h-8 lg:h-10 p-2 ${!passwordError && 'mb-6 lg:mb-10'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!emailError ? 'main-orange' : 'error'}
          ${emailError && 'border-b-2 border-error'}`
        }
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
      <SignupButton />
      <p className='w-full text-xs lg:text-base'>
        Already have an account? <Link href="/login"><span className='text-main-orange hover:underline cursor-pointer'>Login</span></Link>
      </p>
    </form>
  )
}

export function SignupButton() {
  const { pending } = useFormStatus() // Idk why this didn't work in the form component

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
      {pending ? 'Submitting...' : 'Signup'}
    </button>
  )
}
