'use client'

import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import createBlueprint from "./action"
import CategoryInput from "../../components/CategoryInput"
import ImageInput from "../../components/ImageInput"
import FileInput from "../../components/FileInput"

export default function CreateBlueprintForm() {
  const [state, action] = useFormState(createBlueprint, undefined)

  const titleError = state?.error?.title
  const descriptionError = state?.error?.description
  const imageError = state?.error?.images
  const fileError = state?.error?.files
  const categoryError = state?.error?.categories
  const submitError = state?.error?.submit
  const submitSuccess = state?.success?.submit
  const blueprintId = state?.success?.data

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
          <p>Title must:</p>
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
      <ImageInput imageError={imageError} />
      <FileInput fileError={fileError} />
      <CategoryInput error={categoryError} />
      <SubmitButton success={submitSuccess} blueprintId={blueprintId} />
      {submitError && <p className='text-red-500'>{submitError}</p>}
      {submitSuccess && <p className='text-green-500'>{submitSuccess}</p>}
    </form>
  )
}


function SubmitButton({ success, blueprintId }: { success: boolean, blueprintId: string }) {
  const { pending } = useFormStatus()

  return (
    success ? (
      <div className="w-full h-10 bg-logo-blue cursor-pointer">
        <Link
          className="w-full h-full flex justify-center items-center text-lg font-semibold"
          href={`/blueprints/${blueprintId}`}
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