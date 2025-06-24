"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { incrementBlueprintDownloads } from "../../../services/blueprint"
import { createOrUpdateBlueprintRating, getBlueprintRating } from "../../../services/rating"
import { getCommentsByBlueprintId, createComment, updateComment, deleteCommentById } from "../../../services/comment"
import { getPioneerByEmail } from "../../../services/pioneer"
import { CreateCommentSchema, UpdateCommentSchema } from "../../../utils/zod"

export const rateBlueprint = async (blueprintId: number, pioneerName: string, rating: number) => {
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

    const averageRating = await createOrUpdateBlueprintRating(blueprintId, pioneerName, rating)

    revalidatePath(`/blueprints/${blueprintId}`)
    revalidatePath('/blueprints')
    revalidatePath('/search')
    revalidatePath(`/pioneers/${pioneerName}`)

    return averageRating
  } catch (error) {
    console.log(error)
    throw new Error('Failed to rate the blueprint.')
  }
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

export const getComments = async (blueprintId: number) => {
  try {
    const comments = await getCommentsByBlueprintId(blueprintId)
    return comments
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get blueprint comments.')
  }
}

export const createCommentAction = async (content: string, blueprintId: number) => {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.email) {
      throw new Error('Unauthorized')
    }

    const pioneer = await getPioneerByEmail(user.email)
    if (!pioneer) {
      throw new Error('Pioneer not found')
    }

    const validationResults = CreateCommentSchema.safeParse({
      content: content,
      blueprintId: blueprintId
    })

    if (!validationResults.success) {
      throw new Error(validationResults.error.errors[0].message)
    }

    const comment = await createComment(
      blueprintId,
      pioneer.id,
      content
    )

    revalidatePath(`/blueprints/${blueprintId}`)

    return comment
  } catch (error) {
    console.error('Error creating comment:', error)
    throw error
  }
}

export const updateCommentAction = async (content: string, commentId: number) => {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.email) {
      throw new Error('Unauthorized')
    }

    const pioneer = await getPioneerByEmail(user.email)
    if (!pioneer) {
      throw new Error('Pioneer not found')
    }

    const validationResults = UpdateCommentSchema.safeParse({
      content: content,
      commentId: commentId
    })

    if (!validationResults.success) {
      throw new Error(validationResults.error.errors[0].message)
    }

    const comment = await updateComment(
      commentId,
      pioneer.id,
      content
    )

    revalidatePath(`/blueprints/${comment.blueprintId}`)
    return comment
  } catch (error) {
    console.error('Error updating comment:', error)
    throw error
  }
}

export const deleteCommentAction = async (commentId: number) => {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.email) {
      throw new Error('Unauthorized')
    }

    const pioneer = await getPioneerByEmail(user.email)
    if (!pioneer) {
      throw new Error('Pioneer not found')
    }

    const deletedComment = await deleteCommentById(commentId)
    revalidatePath(`/blueprints/${deletedComment.blueprintId}`)

    return deletedComment
  } catch (error) {
    console.error('Error deleting comment:', error)
    throw error
  }
}