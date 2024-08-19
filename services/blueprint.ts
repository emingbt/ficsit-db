import 'server-only'

import { cache } from 'react'
import db from '../utils/postgres'
import { count, desc, eq, avg, and, sql, AnyColumn } from 'drizzle-orm'
import { Blueprint, BlueprintRating, Pioneer } from '../drizzle/schema'

const blueprintsPerPage = 30

const increment = (column: AnyColumn, value = 1) => {
  return sql`${column} + ${value}`
}


export const getBlueprintById = async (id: number) => {
  try {
    const blueprint = await db.query.Blueprint.findFirst({
      where: eq(Blueprint.id, id),
      columns: {
        title: true,
        description: true,
        images: true,
        files: true,
        categories: true,
        pioneerName: true,
        downloads: true,
        averageRating: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!blueprint) {
      throw new Error('Blueprint not found.')
    }

    const pioneerAvatar = await db.query.Pioneer.findFirst({
      where: eq(Pioneer.name, blueprint.pioneerName),
      columns: {
        avatar: true,
        color: true
      }
    })

    if (!pioneerAvatar) {
      throw new Error('Designer of Blueprint not found.')
    }

    return {
      ...blueprint,
      pioneerAvatar: pioneerAvatar.avatar,
      pioneerAvatarColor: pioneerAvatar.color
    }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprint.')
  }
}

export const getAllBlueprintsByPioneer = async (pioneerName: string) => {
  try {
    const blueprints = await db.query.Blueprint.findMany({
      where: eq(Blueprint.pioneerName, pioneerName),
      columns: {
        id: true,
        title: true,
        images: true,
        averageRating: true
      }
    })

    return blueprints
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprint.')
  }
}

export const createNewBlueprint = async (blueprint: Blueprint) => {
  try {
    const newBlueprint = await db.insert(Blueprint)
      .values(blueprint)
      .returning({
        title: Blueprint.title,
        description: Blueprint.description,
        images: Blueprint.images,
        files: Blueprint.files,
        categories: Blueprint.categories,
        pioneerName: Blueprint.pioneerName,
        createdAt: Blueprint.createdAt
      })

    return newBlueprint[0]
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create the blueprint.')
  }
}

export const getPageCountAndBlueprintsByPage = async (page: number) => {
  const offset = (page - 1) * blueprintsPerPage

  if (page < 1) {
    return {
      pageCount: 0,
      blueprints: []
    }
  }

  try {
    const blueprints = await db.select().from(Blueprint)
      .orderBy(desc(Blueprint.id))
      .limit(blueprintsPerPage)
      .offset(offset)

    const pageCount = await getPageCount()

    return { pageCount, blueprints }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprints.')
  }
}

export const incrementBlueprintDownloads = async (blueprintId: number) => {
  try {
    await db.update(Blueprint)
      .set({
        downloads: increment(Blueprint.downloads)
      })
      .where(eq(Blueprint.id, blueprintId))
  } catch (error) {
    console.log(error)
    throw new Error('Failed to increase the blueprint downloads.')
  }
}

export const getPageCount = cache(async () => {
  try {
    const totalBlueprints = (await db.select({ value: count() }).from(Blueprint))[0].value

    const pageCount = Math.ceil(totalBlueprints / blueprintsPerPage)

    return pageCount
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the page count.')
  }
})

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
          createdAt: new Date()
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