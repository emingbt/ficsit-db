import { useState } from 'react'
import { redirect } from 'next/navigation'
import { resetPasswordSchema } from '../../utils/zod'

export default function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError('')
    setConfirmPasswordError('')

    try {
      resetPasswordSchema.parse({ password, confirmPassword })

      if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match')
        return
      }

      const response = await fetch('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify({ password, token })
      })

      const data = await response.json()

      if (response.status !== 200) {
        console.error('There is an error', data.message)
        return
      } else {
        console.log('Successfull', data, data.body)
        // Redirect to the homepage
        redirect('/')
      }
    } catch (error) {
      console.error(error)
      if (error.name === 'ZodError') {
        error.errors.map((err: any) => {
          if (err.path[0] === 'password') {
            setPasswordError(err.message)
          }
          if (err.path[0] === 'confirmPassword') {
            setConfirmPasswordError(err.message)
          }
        })
      }
    }
  }

  return (
    <form className='w-full flex flex-col items-center' onSubmit={handleOnSubmit}>
      <label className='w-full text-xs lg:text-base lg:mb-2'>New Password</label>
      <input
        id='password'
        type='password'
        className={
          `w-full h-8 lg:h-10 p-2 ${!passwordError && 'mb-4 lg:mb-6'} bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!passwordError ? 'main-orange' : 'error'}
          ${passwordError && 'border-b-2 border-error'}`
        }
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {
        passwordError && <p className='w-full text-xs lg:text-base text-error'>{passwordError}</p>
      }
      <label className='w-full text-xs lg:text-base lg:mb-2'>Confirm New Password</label>
      <input
        id='confirmPassword'
        type='password'
        className={
          `w-full h-8 lg:h-10 p-2 ${!confirmPasswordError && 'mb-4 lg:mb-6'} bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!confirmPasswordError ? 'main-orange' : 'error'}
          ${confirmPasswordError && 'border-b-2 border-error'}`
        }
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {
        confirmPasswordError && <p className='w-full text-xs lg:text-base text-error'>{confirmPasswordError}</p>
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