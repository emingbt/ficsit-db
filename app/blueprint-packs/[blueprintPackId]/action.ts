"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { createOrUpdateBlueprintPackRating, getBlueprintPackRating } from "../../../services/rating"
import { getPioneerByEmail } from "../../../services/pioneer"

export const rateBlueprintPack = async (blueprintPackId: number, pioneerName: string, rating: number) => {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession()
    if (!isAuthenticated()) {
      throw new Error('Unauthorized')
    }

    const user = await getUser()
    if (!user || !user.email) {
      throw new Error('Unauthorized')
    }

    const pioneer = await getPioneerByEmail(user.email)
    if (!pioneer) {
      // Redirect to create pioneer page if the pioneer does not exist
      redirect('/create-pioneer')
    }

    if (pioneer.name !== pioneerName) {
      throw new Error('Unauthorized.')
    }

    const averageRating = await createOrUpdateBlueprintPackRating(blueprintPackId, pioneerName, rating)

    revalidatePath(`/blueprint-packs/${blueprintPackId}`)
    revalidatePath('/blueprint-packs')
    revalidatePath('/search')
    revalidatePath(`/pioneers/${pioneerName}`)

    return averageRating
  } catch (error) {
    console.log(error)
    throw new Error('Failed to rate the blueprint.')
  }
}

export const checkIfRated = async (blueprintPackId: number, pioneerName: string) => {
  const blueprintPackRating = await getBlueprintPackRating(blueprintPackId, pioneerName)

  return blueprintPackRating?.rating
}