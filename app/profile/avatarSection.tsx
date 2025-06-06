'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { updateAvatar } from './action'
import { usePioneerStore } from '../../utils/zustand'

import type { Pioneer } from '../../interfaces'

export default function AvatarSection({ pioneer }: { pioneer: Pioneer }) {
  const [state, action] = useFormState(updateAvatar, pioneer)
  const [selectedAvatar, setSelectedAvatar] = useState(pioneer.avatar)
  const [selectedColor, setSelectedColor] = useState(pioneer.color)
  const isChanged = selectedAvatar !== pioneer.avatar || selectedColor !== pioneer.color

  const submitError = state.error?.submit
  const submitSuccess = state.success?.submit

  // Update the store with the new avatar and color on successful submission
  const { setAvatar, setColor } = usePioneerStore((state) => state)

  useEffect(() => {
    if (submitSuccess) {
      setAvatar(selectedAvatar)
      setColor(selectedColor)
    }
  }, [selectedAvatar, selectedColor, submitSuccess])

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
    <section className="w-full lg:w-3/5 lg:h-full flex flex-col flex-grow flex-shrink-0 items-start p-8 bg-main-bg">
      <h1 className="w-full text-left text-2xl"> Avatar</h1>
      <p className="w-full mb-6 text-left text-sm text-gray-300">Update your avatar</p>
      <div className="w-full flex flex-col lg:flex-row">
        <div className={`lg:shrink-0 w-48 h-48 lg:w-64 lg:h-64 relative rounded-full overflow-hidden bg-avatar-${selectedColor} mb-8 lg:mr-4`} >
          <Image src={`/images/avatars/${selectedAvatar}.png`} alt="selectedAvatar" fill sizes='192px, 256px' priority />
        </div>
        <form action={action} className="flex flex-col lg:ml-4">
          <div className='flex flex-row flex-wrap justify-start gap-2 mb-4 lg:mb-6'>
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`w-16 h-16 relative cursor-pointer bg-light-bg ${selectedAvatar === avatar ? 'border-2 border-main-orange' : ''}`}
              >
                <Image
                  src={`/images/avatars/${avatar}.png`}
                  alt={avatar}
                  fill
                  sizes='64px'
                />
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
                    submitSuccess && (state.success.submit = '')
                    submitError && (state.error.submit = '')
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
                    submitSuccess && (state.success.submit = '')
                    submitError && (state.error.submit = '')
                  }}
                />
              </div>
            ))}
          </div>
          <UpdateAvatarButton
            isChanged={isChanged}
          />
          {submitError && <p className='text-red-500 text-sm'>{submitError}</p>}
          {submitSuccess && <p className='text-green-500 text-sm'>{submitSuccess}</p>}
        </form>
      </div>
    </section>
  )
}

function UpdateAvatarButton({ isChanged }: { isChanged: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      aria-disabled={pending || !isChanged}
      disabled={pending || !isChanged}
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