"use server"

import { revalidatePath } from "next/cache"
import { createOrUpdateBlueprintRating, getBlueprintRating } from "../../../services/blueprint"

export const rateBlueprint = async (blueprintId: number, pioneerName: string, rating: number) => {
  try {
    const averageRating = await createOrUpdateBlueprintRating(blueprintId, pioneerName, rating)

    revalidatePath('/blueprints/[blueprintId]', "page")
    revalidatePath('/blueprints', "page")

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

  return !!blueprintRating
}