'use client'

import Link from "next/link"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { deleteBlueprint, updateBlueprint } from "./action"
import ImageInput from "../../../components/ImageInput"
import CategoryInput from "../../../components/CategoryInput"
import { Blueprint } from "../../../drizzle/schema"
import BlueprintVisibilityInput from "../../../components/BlueprintVisibilityInput"

export default function EditBlueprintForm({ blueprint }: { blueprint: Blueprint }) {
  const [state, action] = useFormState(updateBlueprint, undefined)
  const [description, setDescription] = useState(blueprint.description)
  const [videoUrl, setVideoUrl] = useState(blueprint.videoUrl)

  const descriptionError = state?.error?.description
  const imageError = state?.error?.images
  const categoryError = state?.error?.categories
  const videoUrlError = state?.error?.videoUrl
  const submitError = state?.error?.submit
  const submitSuccess = state?.success?.submit

  return (
    <form action={action}>
      <input type="hidden" value={blueprint.id} name="blueprintId" />
      <label htmlFor="description">Description (Optional)</label>
      <textarea
        id="description"
        name="description"
        value={description || ''}
        className={
          `w-full h-16 p-2 ${!descriptionError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!descriptionError ? 'main-orange' : 'error'}
          ${descriptionError && 'border-b-2 border-error'}`
        }
        onChange={(event) => setDescription(event.target.value)}
      />
      {
        descriptionError &&
        <div className='w-full text-xs lg:text-base text-error'>
          <p>{descriptionError}</p>
        </div>
      }
      <ImageInput imageError={imageError} existingImageUrls={blueprint.images} />
      <CategoryInput error={categoryError} existingCategories={blueprint.categories} />
      <label htmlFor="videoUrl">Video Link (Optional)</label>
      <input
        id="videoUrl"
        type="text"
        name="videoUrl"
        value={videoUrl || ''}
        placeholder="https://youtube.com/..."
        className={`w-full h-8 lg:h-10 p-2 ${!videoUrlError && 'mb-4 lg:mb-6'}  bg-light-bg text-white
          rounded-none outline-none focus:border-b-2 border-${!videoUrlError ? 'main-orange' : 'error'}
          ${videoUrlError && 'border-b-2 border-error'}
        `}
        onChange={(event) => setVideoUrl(event.target.value)}
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
      <BlueprintVisibilityInput currentVisibility={blueprint.visibility} />
      <SubmitButton success={submitSuccess} blueprintId={blueprint.id} />
      <DeleteButton blueprintId={blueprint.id} />
      {submitError && <p className='text-red-500'>{submitError}</p>}
      {submitSuccess && <p className='text-green-500'>{submitSuccess}</p>}
    </form>
  )
}

function SubmitButton({ success, blueprintId }: { success: boolean, blueprintId?: number }) {
  const { pending } = useFormStatus()

  return (
    <div className="w-full flex flex-col mb-4 lg:mg-6">
      {success ? (
        <div className="w-full h-10 bg-logo-blue cursor-pointer">
          <Link
            className="w-full h-full flex justify-center items-center text-lg font-medium"
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
          {pending ? 'Updating Blueprint...' : 'Update Blueprint'}
        </button>
      )}
    </div>
  )
}

function DeleteButton({ blueprintId }: { blueprintId?: number }) {
  const [pending, setPending] = useState(false)
  const [deleteError, setDeleteError] = useState<string>()

  return (
    <>
      <button
        type='button'
        className={`w-full h-10 ${pending ? 'bg-light-bg  text-red-500' : 'bg-red-600 hover:bg-light-bg hover:text-red-500  '}  text-white text-base`}
        aria-disabled={pending}
        disabled={pending}
        onClick={async () => {
          if (confirm('Are you sure you want to delete this blueprint?')) {
            if (blueprintId) {
              setPending(true)
              const result = await deleteBlueprint(blueprintId)
              if (result && result.error) {
                setDeleteError(result.error)
                setPending(false)
              }
            }
          }
        }}
      >
        {pending ? 'Deleting Blueprint...' : 'Delete Blueprint'}
      </button>
      {deleteError && <p className='text-red-500 mt-2'>{deleteError}</p>}
    </>
  )
}