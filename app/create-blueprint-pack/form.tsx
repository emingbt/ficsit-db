'use client'

import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import createBlueprintPack from "./action"
import CategoryInput from "../../components/CategoryInput"
import ImageInput from "../../components/ImageInput"
import BlueprintSelector from "../../components/BlueprintSelector"
import { redirect } from "next/navigation"

export default function CreateBlueprintPackForm({ blueprints }: { blueprints: { id: number, title: string, images: string[] }[] }) {
  const [state, action] = useFormState(createBlueprintPack, undefined)

  const titleError = state?.error?.title
  const descriptionError = state?.error?.description
  const imageError = state?.error?.images
  const blueprintsError = state?.error?.blueprints
  const categoryError = state?.error?.categories
  const videoUrlError = state?.error?.videoUrl
  const submitError = state?.error?.submit
  const submitSuccess = state?.success?.submit
  const blueprintPackId = state?.success?.data

  if (submitSuccess && blueprintPackId) {
    // If the blueprint was created successfully, redirect to the blueprint page
    redirect(`/blueprint-packs/${blueprintPackId}`)
  }

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
      <BlueprintSelector blueprints={blueprints} blueprintsError={blueprintsError} />
      <CategoryInput error={categoryError} />
      <label htmlFor="videoUrl">Video Link (Optional)</label>
      <input
        id="videoUrl"
        name="videoUrl"
        placeholder="https://youtube.com/..."
        className={`w-full h-8 lg:h-10 p-2 ${!videoUrlError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!videoUrlError ? 'main-orange' : 'error'}
          ${videoUrlError && 'border-b-2 border-error'}
        `}
      />
      {
        videoUrlError &&
        <div className="w-full text-xs lg:text-base text-error mb-4">
          <p>Video link must:</p>
          <ul>
            {videoUrlError.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      }
      <SubmitButton success={submitSuccess} blueprintPackId={blueprintPackId} />
      {submitError && <p className='text-red-500'>{submitError}</p>}
      {submitSuccess && <p className='text-green-500'>{submitSuccess}</p>}
    </form>
  )
}


function SubmitButton({ success, blueprintPackId }: { success: boolean, blueprintPackId: string }) {
  const { pending } = useFormStatus()

  return (
    success ? (
      <div className="w-full h-10 bg-logo-blue cursor-pointer">
        <Link
          className="w-full h-full flex justify-center items-center text-lg font-semibold"
          href={`/blueprint-packs/${blueprintPackId}`}
        >
          Go to Blueprint Pack
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
        {pending ? 'Creating Blueprint Pack...' : 'Create Blueprint Pack'}
      </button>
    ))
}