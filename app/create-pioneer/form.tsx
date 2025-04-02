'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { createPioneer } from './action'

export default function CreatePioneerForm() {
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

  const [username, setUsername] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0])
  const [selectedColor, setSelectedColor] = useState(colors[0])

  const [state, action] = useFormState(createPioneer, undefined)

  let nameError = state?.error?.name
  let submitError = state?.error?.submit

  return (
    <section className='w-full'>
      <div className='w-full flex flex-row items-center mb-6'>
        <div className={`w-20 h-20 rounded-full overflow-hidden bg-avatar-${selectedColor} mr-4`}>
          <div className='w-full h-full relative'>
            <Image
              src={`/images/avatars/${selectedAvatar}.png`}
              alt={selectedAvatar}
              fill
              sizes='100%'
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className='h-full flex flex-wrap'>
          <p className='text-lg font-semibold'>{username}</p>
        </div>
      </div>
      <form action={action} className='w-full flex flex-col items-center'>
        <label htmlFor='name' className='w-full text-xs lg:text-base lg:mb-2'>Name</label>
        <input
          id='name'
          type='text'
          name='name'
          placeholder='pi0neer'
          spellCheck='false'
          autoCorrect='off'
          autoCapitalize='none'
          className={
            `w-full h-8 lg:h-10 p-2 ${!nameError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!nameError ? 'main-orange' : 'error'}
          ${nameError && 'border-b-2 border-error'}`
          }
          onChange={(e) => setUsername(e.target.value)}
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
        <label className='w-full text-xs lg:text-base lg:mb-2'>Avatar</label>
        <div className='w-full flex flex-row flex-wrap justify-start gap-2 mb-4 lg:mb-6'>
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
                  setSelectedColor(color)
                }}
              />
            </div>
          ))}
        </div>
        <SignupButton />
        {
          submitError &&
          <div className='w-full text-xs lg:text-base text-error mt-4'>
            <p>{submitError}</p>
          </div>
        }
      </form>
    </section>
  )
}

export function SignupButton() {
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
      {pending ? 'Submitting...' : 'Create Account'}
    </button>
  )
}