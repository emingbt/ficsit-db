"use server"

import { revalidatePath } from "next/cache"
import { incrementBlueprintDownloads } from "../../../services/blueprint"
import { createOrUpdateBlueprintRating, getBlueprintRating } from "../../../services/rating"

export const rateBlueprint = async (blueprintId: number, pioneerName: string, rating: number) => {
  try {
    const averageRating = await createOrUpdateBlueprintRating(blueprintId, pioneerName, rating)

    revalidatePath(`/blueprints/${blueprintId}`)
    revalidatePath('/blueprints')
    revalidatePath('/search')

    return averageRating
  } catch (error) {
    console.log(error)
    throw new Error('Failed to rate the blueprint.')
  }
}

export const getRating = async (blueprintId: number, pioneerName: string) => {
  const blueprintRating = await getBlueprintRating(blueprintId, pioneerName)

  return blueprintRating
}

export const checkIfRated = async (blueprintId: number, pioneerName: string) => {
  const blueprintRating = await getBlueprintRating(blueprintId, pioneerName)

  return blueprintRating?.rating
}

export const incrementDownloads = async (blueprintId: number, pioneerName: string) => {
  try {
    await incrementBlueprintDownloads(blueprintId)

    revalidatePath(`/blueprints/${blueprintId}`)
    revalidatePath(`/pioneers/${pioneerName}`)
    revalidatePath('/pioneers')
  } catch (error) {
    console.log(error)
    throw new Error('Failed to increment the blueprint downloads.')
  }
}