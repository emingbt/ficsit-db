'use client'

import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import createBlueprint from "./action"
import CategoryInput from "./categoryInput"
import Link from "next/link"

export default function CreateBlueprintForm() {
  const [state, action] = useFormState(createBlueprint, undefined)
  const [images, setImages] = useState<File[]>([])

  const titleError = state?.error?.title
  const descriptionError = state?.error?.description
  const imageError = state?.error?.images
  const fileError = state?.error?.files
  const categoryError = state?.error?.categories
  const submitError = state?.error?.submit
  const submitSuccess = state?.success?.submit
  const blueprintTitle = state?.success?.data

  return (
    <form action={action}>
      <label htmlFor='title'>Title</label>
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
        <div className="w-full text-xs lg:text-base text-error mb-4">
          <p>Name must:</p>
          <ul>
            {titleError.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      }
      <label htmlFor="description">Description (Optional)</label>
      <textarea
        id="description"
        name="description"
        className={
          `w-full h-16 p-2 ${!descriptionError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!descriptionError ? 'main-orange' : 'error'}
          ${descriptionError && 'border-b-2 border-error'}`
        }
      />
      {
        descriptionError &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{descriptionError}</p>
        </div>
      }
      <label htmlFor="images">Images</label>
      <input
        id="images"
        type="file"
        name="images"
        accept="image/jpeg, image/jpg, image/png, image/webp"
        multiple
        max="5"
        className={
          `w-full h-8 lg:h-10 p-2 ${!imageError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!imageError ? 'main-orange' : 'error'}
          ${imageError && 'border-b-2 border-error'}`
        }
        // add images to state
        onChange={(event) => {
          const files = event.target.files
          if (files) {
            setImages(Array.from(files))
          }
        }}
      />
      {
        imageError &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{imageError}</p>
        </div>
      }
      <div className="w-full flex flex-wrap flex-row gap-4 mb-4 lg:mb-6">
        {images?.map((image) => (
          <img
            key={image.name}
            src={URL.createObjectURL(image)}
            alt={image.name}
            className='w-32 h-20 object-cover bg-light-bg'
          />
        ))}
      </div>
      <label htmlFor="files">Blueprint files</label>
      <input
        id="files"
        type="file"
        name="files"
        accept=".sbp, .sbpcfg"
        multiple
        max="5"
        className={
          `w-full h-8 lg:h-10 p-2 ${!fileError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!fileError ? 'main-orange' : 'error'}
          ${fileError && 'border-b-2 border-error'}`
        }
      />
      {
        fileError &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{fileError}</p>
        </div>
      }
      <CategoryInput error={categoryError} />
      <SubmitButton success={submitSuccess} blueprintTitle={blueprintTitle} />
      {submitError && <p className='text-red-500'>{submitError}</p>}
      {submitSuccess && <p className='text-green-500'>{submitSuccess}</p>}
    </form>
  )
}


function SubmitButton({ success, blueprintTitle }: { success: boolean, blueprintTitle: string }) {
  const { pending } = useFormStatus()

  return (
    success ? (
      <div className="w-full h-10 bg-logo-blue cursor-pointer">
        <Link
          className="w-full h-full flex justify-center items-center text-lg font-semibold"
          href={`/blueprints/${blueprintTitle}`}
        >
          Go to Blueprint
        </Link>
      </div>
    ) : (
      <button
        type='submit'
        aria-disabled={pending}
        disabled={pending}
        className={`
        w-full h-10 text-base
        ${pending ? 'bg-light-bg  text-light-orange' : 'bg-main-orange'}
        hover:bg-light-bg hover:text-light-orange
      `}
      >
        {pending ? 'Creating Blueprint...' : 'Create Blueprint'}
      </button>
    ))
}