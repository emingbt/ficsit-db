'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { updateAvatar } from './action'

import type { Pioneer } from '../../interfaces'

export default function AvatarSection({ pioneer }: { pioneer: Pioneer }) {
  const [state, action] = useFormState(updateAvatar, pioneer)
  const [selectedAvatar, setSelectedAvatar] = useState(pioneer.avatar)
  const [selectedColor, setSelectedColor] = useState(pioneer.color)

  const submitError = state.error?.submit
  const submitSuccess = state.success?.submit

  const avatars = [
    "pioneer",
    "space-giraffe-tick-penguin-whale",
    "lizard-doggo",
    "small-stinger",
    "bacon-agaric",
    "beryl-nut",
    "paleberry",
    "ficsit-coffee-cup"
  ]

  const colors = [
    "gray",
    "purple",
    "indigo",
    "blue",
    "green",
    "yellow",
    "orange",
    "red"
  ]

  return (
    <section className="w-full lg:w-3/5 flex flex-col items-start justify-center p-8 bg-main-bg">
      <h1 className="w-full text-left text-2xl"> Avatar</h1>
      <p className="w-full mb-6 text-left text-sm text-gray-300">Update your avatar</p>
      <div className="w-full flex flex-col lg:flex-row">
        <div className={`lg:shrink-0 w-48 h-48 lg:w-64 lg:h-64 relative rounded-full overflow-hidden bg-avatar-${selectedColor} mb-8 lg:mr-4`} >
          <Image src={`/images/avatars/${selectedAvatar}.png`} alt="selectedAvatar" fill />
        </div>
        <form action={action} className="flex flex-col lg:ml-4">
          <div className='flex flex-row flex-wrap justify-start gap-2 mb-4 lg:mb-6'>
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`w-16 h-16 relative cursor-pointer bg-light-bg ${selectedAvatar === avatar ? 'border-2 border-main-orange' : ''}`}
              >
                <Image src={`/images/avatars/${avatar}.png`} alt={avatar} fill />
                <input
                  id={avatar}
                  value={avatar}
                  name='avatar'
                  checked={selectedAvatar === avatar}
                  className='bg-transparent w-full h-full opacity-0 cursor-pointer'
                  type='radio'
                  onChange={() => {
                    // @ts-ignore
                    setSelectedAvatar(avatar)
                  }}
                />
              </div>
            ))}
          </div>
          <label className='w-full text-xs lg:text-base lg:mb-2'>Color</label>
          <div className='w-full flex flex-row flex-wrap justify-start gap-2 mb-6 lg:mb-10'>
            {colors.map((color, index) => (
              <div key={index} className={`w-16 h-8 cursor-pointer bg-avatar-${color} ${selectedColor === color ? 'border-2 border-main-orange' : ''}`}>
                <input
                  id={color}
                  value={color}
                  name='color'
                  checked={selectedColor === color}
                  className='bg-transparent w-full h-full opacity-0 cursor-pointer'
                  type='radio'
                  onChange={() => {
                    // @ts-ignore
                    setSelectedColor(color)
                  }}
                />
              </div>
            ))}
          </div>
          <UpdateAvatarButton />
          {submitError && <p className='text-red-500 text-sm'>{submitError}</p>}
          {submitSuccess && <p className='text-green-500 text-sm'>{submitSuccess}</p>}
        </form>
      </div>
    </section>
  )
}

export function UpdateAvatarButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      className={`
        w-full h-10 lg:h-10 text-base
        ${pending ? 'bg-light-bg  text-light-orange' : 'bg-main-orange'}
        hover:bg-light-bg hover:text-light-orange
      `}
    >
      {pending ? 'Submitting...' : 'Update Avatar'}
    </button>
  )
}