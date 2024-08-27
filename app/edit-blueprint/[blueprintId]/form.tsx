'use client'

import Link from "next/link"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { deleteBlueprint, updateBlueprint } from "./action"
import ImageInput from "../../../components/imageInput"
import CategoryInput from "../../../components/categoryInput"
import { Blueprint } from "../../../drizzle/schema"

export default function EditBlueprintForm({ blueprint }: { blueprint: Blueprint }) {
  const [state, action] = useFormState(updateBlueprint, undefined)
  const [description, setDescription] = useState(blueprint.description)

  const descriptionError = state?.error?.description
  const imageError = state?.error?.images
  const categoryError = state?.error?.categories
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
      <SubmitButton success={submitSuccess} blueprintId={blueprint.id} />
      // Delete blueprint button
      <button
        type='button'
        className='w-full h-10 bg-error hover:bg-error-hover text-white text-base'
        onClick={() => {
          if (confirm('Are you sure you want to delete this blueprint?')) {
            deleteBlueprint(blueprint.id)
          }
        }}
      >
        Delete Blueprint
      </button>
      {submitError && <p className='text-red-500'>{submitError}</p>}
      {submitSuccess && <p className='text-green-500'>{submitSuccess}</p>}
    </form>
  )
}


function SubmitButton({ success, blueprintId }: { success: boolean, blueprintId?: number }) {
  const { pending } = useFormStatus()

  return (
    <div className="w-full flex flex-col">
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