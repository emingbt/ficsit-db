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
        id: true,
        title: true,
        description: true,
        images: true,
        files: true,
        categories: true,
        pioneerName: true,
        downloads: true,
        averageRating: true,
        createdAt: true,
        updatedAt: true,
        videoUrl: true
      }
    })

    if (!blueprint) {
      return undefined
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

export const getAllBlueprintsByTitle = async (title: string, blueprintCount = 30) => {
  if (!title || title.trim() == '') {
    return []
  }

  try {
    // Check if the blueprint title includes the search term
    const blueprints = await db.query.Blueprint.findMany({
      where: sql`${Blueprint.title} ILIKE ${`%${title}%`}`,
      orderBy: desc(Blueprint.createdAt),
      limit: blueprintCount,
      columns: {
        id: true,
        title: true,
        images: true,
        averageRating: true,
        downloads: true
      }
    })
    return blueprints
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprints by title.')
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
        averageRating: true,
        downloads: true,
      },
      orderBy: desc(Blueprint.createdAt)
    })

    return blueprints
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprint.')
  }
}

export const checkIfTitleIsUsed = async (title: string) => {
  try {
    // Check if a blueprint with the same title already exists with lowercase comparison
    const existingBlueprint = await db.query.Blueprint.findFirst({
      where: sql`${Blueprint.title} ILIKE ${title}`,
      columns: {
        id: true
      }
    })

    return existingBlueprint
  } catch (error) {
    console.log(error)
    throw new Error('Failed to check if the title is not used.')
  }
}

export const createNewBlueprint = async (blueprint: Blueprint) => {
  try {
    // Check if a blueprint with the same title already exists
    const isTitleUsed = await checkIfTitleIsUsed(blueprint.title)

    if (isTitleUsed) {
      throw new Error('A blueprint with this title already exists.')
    }

    const newBlueprint = await db.insert(Blueprint)
      .values(blueprint)
      .returning({
        id: Blueprint.id,
        title: Blueprint.title,
        description: Blueprint.description,
        images: Blueprint.images,
        files: Blueprint.files,
        categories: Blueprint.categories,
        videoUrl: Blueprint.videoUrl,
        pioneerName: Blueprint.pioneerName,
        createdAt: Blueprint.createdAt
      })

    return newBlueprint[0]
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.message === 'A blueprint with this title already exists.') {
      throw error
    }
    throw new Error('Failed to create the blueprint.')
  }
}

export const updateBlueprintProperties = async (blueprintId: number, blueprint: {
  description: Blueprint["description"],
  images: Blueprint["images"],
  categories: Blueprint["categories"]
}) => {
  try {
    const updatedBlueprint = await db.update(Blueprint)
      .set({
        ...blueprint,
        updatedAt: sql`now()`
      })
      .where(eq(Blueprint.id, blueprintId))
      .returning({
        id: Blueprint.id
      })

    return updatedBlueprint[0]
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update the blueprint.')
  }
}

export const deleteBlueprintById = async (blueprintId: number) => {
  try {
    // 1. Delete the blueprint ratings
    await db.delete(BlueprintRating)
      .where(eq(BlueprintRating.blueprintId, blueprintId))

    // 2. Delete the blueprint
    const deletedBlueprint = await db.delete(Blueprint)
      .where(eq(Blueprint.id, blueprintId))
      .returning({
        id: Blueprint.id
      })

    return deletedBlueprint[0]
  } catch (error) {
    console.log(error)
    throw new Error('Failed to delete the blueprint.')
  }
}

export const getPageCountAndBlueprintsByPage = async (
  page: number,
  category?: Blueprint["categories"][number],
  sort?: string
) => {
  const offset = (page - 1) * blueprintsPerPage

  if (page < 1) {
    return {
      pageCount: 0,
      blueprints: []
    }
  }

  try {
    const blueprints = await db.query.Blueprint.findMany({
      // Query for multiple categories (Didn't use, it may be useful in the future)
      // // where: and(
      // //   categories && categories.length > 0
      // //     ? sql`${Blueprint.categories} @> ARRAY[${sql.join(categories, sql`, `)}]::"category"[]`
      // //     : undefined
      // // ),
      where: sql`${Blueprint.categories} @> ARRAY[${category}]::"category"[]`,
      orderBy: sort === 'oldest' ? Blueprint.createdAt :
        sort === 'rating' ? desc(Blueprint.averageRating) :
          sort === 'download' ? desc(Blueprint.downloads) :
            desc(Blueprint.createdAt),
      limit: blueprintsPerPage,
      offset,
      columns: {
        id: true,
        title: true,
        images: true,
        averageRating: true,
        downloads: true
      }
    })

    const pageCount = await getPageCount(category)

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

export const getPageCount = cache(async (category?: Blueprint["categories"][number]) => {
  try {
    const totalBlueprints = (await db.select({ value: count() }).from(Blueprint).where(
      category ? sql`${Blueprint.categories} @> ARRAY[${category}]::"category"[]` : undefined
    ))[0].value

    const pageCount = Math.ceil(totalBlueprints / blueprintsPerPage)

    return pageCount
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the page count.')
  }
})