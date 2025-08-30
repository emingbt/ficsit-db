import 'server-only'

import { cache } from 'react'
import db from '../utils/postgres'
import { count, desc, eq, sql, AnyColumn, inArray } from 'drizzle-orm'
import { Blueprint, BlueprintComment, BlueprintPack, BlueprintPackBlueprints, BlueprintRating, Pioneer } from '../drizzle/schema'

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
        videoUrl: true,
        visibility: true
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

export const getAllBlueprintsByTitle = async (title: string, blueprintCount = blueprintsPerPage) => {
  if (!title || title.trim() == '') {
    return []
  }

  try {
    // Check if the blueprint title includes the search term
    const blueprints = await db.query.Blueprint.findMany({
      where: sql`${Blueprint.title} ILIKE ${`%${title}%`} AND ${Blueprint.visibility} = 'public'`,
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
        visibility: true
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
        createdAt: Blueprint.createdAt,
        visibility: Blueprint.visibility
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
  categories: Blueprint["categories"],
  videoUrl: Blueprint["videoUrl"],
  visibility: Blueprint["visibility"]
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

    // 2. Delete the blueprint comments (if any)
    await db.delete(BlueprintComment)
      .where(eq(BlueprintComment.blueprintId, blueprintId))

    // 3. Delete the blueprint
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

  if (page < 1) { // Early return for invalid page numbers
    return {
      pageCount: 0,
      blueprints: []
    }
  } else if (page > 10) { // Early return for the bots. WILL BE REMOVED
    return {
      pageCount: 10,
      blueprints: []
    }
  }

  try {
    const blueprints = await db.query.Blueprint.findMany({
      where: sql`${Blueprint.categories} @> ARRAY[${category}]::"category"[] AND ${Blueprint.visibility} = 'public'`,
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
      category ? sql`${Blueprint.categories} @> ARRAY[${category}]::"category"[] AND ${Blueprint.visibility} = 'public'` : sql`${Blueprint.visibility} = 'public'`
    ))[0].value

    const pageCount = Math.ceil(totalBlueprints / blueprintsPerPage)

    return pageCount
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the page count.')
  }
})

export const getBlueprintPacksByBlueprintId = cache(async (blueprintId: number) => {
  try {
    const blueprintPackIds = await db.query.BlueprintPackBlueprints.findMany({
      where: eq(BlueprintPackBlueprints.blueprintId, blueprintId),
      columns: {
        blueprintPackId: true
      }
    })

    if (blueprintPackIds.length === 0) {
      return []
    }

    // Get the blueprint packs by their IDs with the blueprint count
    const blueprintPacks = await db
      .select({
        id: BlueprintPack.id,
        title: BlueprintPack.title,
        images: BlueprintPack.images,
        averageRating: BlueprintPack.averageRating,
        blueprintCount: count(BlueprintPackBlueprints.blueprintId)
      })
      .from(BlueprintPack)
      .leftJoin(
        BlueprintPackBlueprints,
        eq(BlueprintPack.id, BlueprintPackBlueprints.blueprintPackId)
      )
      .where(inArray(BlueprintPack.id, blueprintPackIds.map(bp => bp.blueprintPackId)))
      .groupBy(BlueprintPack.id, BlueprintPack.title, BlueprintPack.images, BlueprintPack.averageRating)
      .orderBy(desc(BlueprintPack.createdAt))

    return blueprintPacks
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprint packs by blueprint ID.')
  }
})