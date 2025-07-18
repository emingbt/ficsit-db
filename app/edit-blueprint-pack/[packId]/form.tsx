'use client'

import Link from "next/link"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { deleteBlueprintPack, updateBlueprintPack } from "./action"
import ImageInput from "../../../components/ImageInput"
import CategoryInput from "../../../components/CategoryInput"
import BlueprintSelector from "../../../components/BlueprintSelector"
import { BlueprintPack } from "../../../drizzle/schema"
import { BlueprintCardProps } from "../../../interfaces"

export default function EditBlueprintForm({ blueprintPack, blueprints, selectedBlueprints }: {
  blueprintPack: BlueprintPack,
  blueprints: BlueprintCardProps[],
  selectedBlueprints: BlueprintCardProps[]
}) {
  const [state, action] = useFormState(updateBlueprintPack, undefined)
  const [description, setDescription] = useState(blueprintPack.description)
  const [videoUrl, setVideoUrl] = useState(blueprintPack.videoUrl)

  const descriptionError = state?.error?.description
  const imageError = state?.error?.images
  const blueprintsError = state?.error?.blueprints
  const categoryError = state?.error?.categories
  const videoUrlError = state?.error?.videoUrl
  const submitError = state?.error?.submit
  const submitSuccess = state?.success?.submit

  return (
    <form action={action}>
      <input type="hidden" value={blueprintPack.id} name="blueprintPackId" />
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
      <ImageInput imageError={imageError} existingImageUrls={blueprintPack.images} />
      <BlueprintSelector blueprints={blueprints} blueprintsError={blueprintsError} selectedBlueprints={selectedBlueprints} />
      <CategoryInput error={categoryError} existingCategories={blueprintPack.categories} />
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
      <SubmitButton success={submitSuccess} blueprintPackId={blueprintPack.id} />
      <DeleteButton blueprintPackId={blueprintPack.id} />
      {submitError && <p className='text-red-500'>{submitError}</p>}
      {submitSuccess && <p className='text-green-500'>{submitSuccess}</p>}
    </form>
  )
}

function SubmitButton({ success, blueprintPackId }: { success: boolean, blueprintPackId?: number }) {
  const { pending } = useFormStatus()

  return (
    <div className="w-full flex flex-col mb-4 lg:mg-6">
      {success ? (
        <div className="w-full h-10 bg-logo-blue cursor-pointer">
          <Link
            className="w-full h-full flex justify-center items-center text-lg font-medium"
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
          {pending ? 'Updating Blueprint Pack...' : 'Update Blueprint Pack'}
        </button>
      )}
    </div>
  )
}

function DeleteButton({ blueprintPackId }: { blueprintPackId?: number }) {
  const [pending, setPending] = useState(false)

  return (
    <button
      type='button'
      className={`w-full h-10 ${pending ? 'bg-light-bg  text-red-500' : 'bg-red-600'} hover:bg-light-bg hover:text-red-500 text-white text-base`}
      onClick={async () => {
        if (confirm('Are you sure you want to delete this blueprint pack?')) {
          if (blueprintPackId) {
            setPending(true)
            await deleteBlueprintPack(blueprintPackId)
          }
        }
      }}
    >
      {pending ? 'Deleting Blueprint Pack...' : 'Delete Blueprint Pack'}
    </button>
  )
}