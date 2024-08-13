'use client'

import { useFormState, useFormStatus } from "react-dom"
import createBlueprint from "./action"
import CategoryInput from "./categoryInput"

export default function CreateBlueprintForm() {
  const [state, action] = useFormState(createBlueprint, undefined)

  const titleError = state?.error?.title
  const imageError = state?.error?.images
  const fileError = state?.error?.files
  const categoryError = state?.error?.categories
  const submitError = state?.error?.submit
  const submitSuccess = state?.success?.submit

  return (
    <form action={action}>
      <label htmlFor='title' className='w-full text-xs lg:text-base lg:mb-2'>Title</label>
      <input
        id='title'
        type='text'
        name='title'
        className={
          `w-full h-8 lg:h-10 p-2 ${!titleError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!titleError ? 'main-orange' : 'error'}
          ${titleError && 'border-b-2 border-error'}`
        }
      />
      {
        titleError &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{titleError}</p>
        </div>
      }
      <label htmlFor="description">Description (Optional)</label>
      <textarea
        id="description"
        name="description"
        className="w-full h-16 p-2 mb-6 bg-light-bg text-white rounded-none outline-none focus:border-b-2 border-main-orange"
      />
      <label htmlFor="images">Images</label>
      <input
        id="images"
        type="file"
        name="images"
        accept="image/jpeg, image/jpg, image/png, image/webp"
        multiple
        max="5"
        className={
          `w-full h-8 lg:h-10 p-2 ${!titleError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!titleError ? 'main-orange' : 'error'}
          ${titleError && 'border-b-2 border-error'}`
        }
      />
      {
        imageError &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{imageError}</p>
        </div>
      }
      <label htmlFor="files">Blueprint files</label>
      <input
        id="files"
        type="file"
        name="files"
        accept=".sbp, .sbpcfg"
        multiple
        max="5"
        className={
          `w-full h-8 lg:h-10 p-2 ${!titleError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!titleError ? 'main-orange' : 'error'}
          ${titleError && 'border-b-2 border-error'}`
        }
      />
      {
        fileError &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{fileError}</p>
        </div>
      }
      <CategoryInput error={categoryError} />
      <label htmlFor="mods">Mods used (Optional)</label>
      <input
        id="mods"
        type="text"
        name="mods"
        className="w-full h-10 p-2 mb-6 bg-light-bg text-white rounded-none outline-none focus:border-b-2 border-main-orange"
      />
      <SubmitButton />
      {submitError && <p className='text-red-500'>{submitError}</p>}
      {submitSuccess && <p className='text-green-500'>{submitSuccess}</p>}
    </form>
  )
}


function SubmitButton() {
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
      {pending ? 'Submitting...' : 'Create Blueprint'}
    </button>
  )
}