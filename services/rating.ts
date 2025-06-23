import "server-only"
import db from "../utils/postgres"
import { and, avg, desc, eq, gte } from 'drizzle-orm'
import { Blueprint, BlueprintPack, BlueprintPackRating, BlueprintRating } from "../drizzle/schema"
import { getBlueprintById } from "./blueprint"

export const getBlueprintRating = async (blueprintId: number, pioneerName: string) => {
  try {
    const blueprintRating = (await db.select().from(BlueprintRating)
      .where(and(
        eq(BlueprintRating.blueprintId, blueprintId),
        eq(BlueprintRating.pioneerName, pioneerName)
      )))[0]

    return blueprintRating
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprint rating.')
  }
}

export const createOrUpdateBlueprintRating = async (blueprintId: number, pioneerName: string, rating: number) => {
  if (rating < 1 || rating > 5 || rating % 1 !== 0) {
    throw new Error('Rating must be a whole number between 1 and 5.')
  }

  try {
    // Check if the pioneer has already rated the blueprint
    const existingRating = await getBlueprintRating(blueprintId, pioneerName)

    if (existingRating) {
      // Update the existing rating
      await db.update(BlueprintRating)
        .set({
          rating,
          updatedAt: new Date(),
        })
        .where(eq(BlueprintRating.id, existingRating.id))
    } else {
      // Create a new rating
      await db.insert(BlueprintRating)
        .values({
          blueprintId,
          pioneerName,
          rating
        })
    }

    // Update the average rating of the blueprint
    const averageRatingValue = (await db.select({
      value: avg(BlueprintRating.rating)
    }).from(BlueprintRating)
      .where(eq(BlueprintRating.blueprintId, blueprintId)))[0].value

    if (!averageRatingValue) {
      throw new Error('Failed to calculate the average rating.')
    }

    const averageRating = parseFloat(averageRatingValue)

    await db.update(Blueprint)
      .set({
        averageRating
      })
      .where(eq(Blueprint.id, blueprintId))

    return averageRating
  } catch (error) {
    console.log(error)
    throw new Error('Failed to rate the blueprint.')
  }
}

export const getBlueprintPackRating = async (blueprintPackId: number, pioneerName: string) => {
  try {
    const blueprintPackRating = (await db.select().from(BlueprintPackRating)
      .where(and(
        eq(BlueprintPackRating.blueprintPackId, blueprintPackId),
        eq(BlueprintPackRating.pioneerName, pioneerName)
      )))[0]

    return blueprintPackRating
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprint pack rating.')
  }
}

export const createOrUpdateBlueprintPackRating = async (blueprintPackId: number, pioneerName: string, rating: number) => {
  if (rating < 1 || rating > 5 || rating % 1 !== 0) {
    throw new Error('Rating must be a whole number between 1 and 5.')
  }

  try {
    // Check if the pioneer has already rated the blueprint pack
    const existingRating = await getBlueprintPackRating(blueprintPackId, pioneerName)

    if (existingRating) {
      // Update the existing rating
      await db.update(BlueprintPackRating)
        .set({
          rating,
          updatedAt: new Date(),
        })
        .where(eq(BlueprintPackRating.id, existingRating.id))
    } else {
      // Create a new rating
      await db.insert(BlueprintPackRating)
        .values({
          blueprintPackId,
          pioneerName,
          rating
        })
    }

    // Update the average rating of the blueprint
    const averageRatingValue = (await db.select({
      value: avg(BlueprintPackRating.rating)
    }).from(BlueprintPackRating)
      .where(eq(BlueprintPackRating.blueprintPackId, blueprintPackId)))[0].value

    if (!averageRatingValue) {
      throw new Error('Failed to calculate the average rating.')
    }

    const averageRating = parseFloat(averageRatingValue)

    await db.update(BlueprintPack)
      .set({
        averageRating
      })
      .where(eq(BlueprintPack.id, blueprintPackId))

    return averageRating
  } catch (error) {
    console.log(error)
    throw new Error('Failed to rate the blueprint.')
  }
}

export const getTopRatedBlueprintOfWeek = async () => {
  const topBlueprintsofWeek = await db.select({ blueprintId: BlueprintRating.blueprintId })
    .from(BlueprintRating)
    .where(gte(BlueprintRating.createdAt, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)))
    .groupBy(BlueprintRating.blueprintId)
    .orderBy(desc(avg(BlueprintRating.rating)))
    .limit(1)

  const blueprint = await getBlueprintById(topBlueprintsofWeek[0]?.blueprintId)

  return blueprint
}