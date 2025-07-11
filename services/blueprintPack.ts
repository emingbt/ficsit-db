import "server-only"

import { cache } from 'react'
import db from "../utils/postgres"
import { Blueprint, BlueprintPack, BlueprintPackBlueprints, BlueprintPackRating, Pioneer } from "../drizzle/schema"
import { count, desc, eq, sql } from 'drizzle-orm'

const blueprintPacksPerPage = 30

export const getBlueprintPackById = async (blueprintPackId: number) => {
  try {
    const blueprintPack = await db.query.BlueprintPack.findFirst({
      where: eq(BlueprintPack.id, blueprintPackId),
      columns: {
        id: true,
        title: true,
        description: true,
        images: true,
        categories: true,
        pioneerName: true,
        averageRating: true,
        createdAt: true,
        updatedAt: true,
        videoUrl: true
      }
    })

    if (!blueprintPack) {
      return undefined
    }

    const pioneerAvatar = await db.query.Pioneer.findFirst({
      where: eq(Pioneer.name, blueprintPack.pioneerName),
      columns: {
        avatar: true,
        color: true
      }
    })

    if (!pioneerAvatar) {
      throw new Error('Designer of Blueprint Pack not found.')
    }

    return {
      pioneerAvatarColor: pioneerAvatar.color,
      pioneerAvatar: pioneerAvatar.avatar,
      ...blueprintPack
    }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to retrieve the blueprint pack.')
  }
}

export const getAllBlueprintsByBlueprintPackId = async (blueprintPackId: number) => {
  try {
    const blueprints = await db
      .select({
        id: Blueprint.id,
        title: Blueprint.title,
        images: Blueprint.images,
        files: Blueprint.files,
        averageRating: Blueprint.averageRating
      })
      .from(Blueprint)
      .innerJoin(
        BlueprintPackBlueprints,
        eq(Blueprint.id, BlueprintPackBlueprints.blueprintId)
      )
      .where(eq(BlueprintPackBlueprints.blueprintPackId, blueprintPackId))

    return blueprints
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprints for the blueprint pack.')
  }
}

export const getAllBlueprintPacksByTitle = async (title: string, blueprintPackCount = blueprintPacksPerPage) => {
  if (!title || title.trim() == '') {
    return []
  }

  try {
    // Check if the blueprint pack title includes the search term
    const blueprintPacks = await db.query.BlueprintPack.findMany({
      where: sql`${BlueprintPack.title} ILIKE ${`%${title}%`}`,
      orderBy: desc(BlueprintPack.createdAt),
      limit: blueprintPackCount,
      columns: {
        id: true,
        title: true,
        images: true,
        averageRating: true
      }
    })
    return blueprintPacks
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprint packs by title.')
  }
}

export const getAllBlueprintPacksByPioneer = async (pioneerName: string) => {
  try {
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
      .where(eq(BlueprintPack.pioneerName, pioneerName))
      .groupBy(BlueprintPack.id, BlueprintPack.title, BlueprintPack.images, BlueprintPack.averageRating)
      .orderBy(desc(BlueprintPack.createdAt))

    return blueprintPacks
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprint pack.')
  }
}

export const checkIfTitleIsUsed = async (title: string) => {
  try {
    // Check if a blueprint with the same title already exists with lowercase comparison
    const existingBlueprintPack = await db.query.BlueprintPack.findFirst({
      where: sql`${BlueprintPack.title} ILIKE ${title}`,
      columns: {
        id: true
      }
    })

    if (existingBlueprintPack) {
      return existingBlueprintPack
    }

    return false
  } catch (error) {
    console.log(error)
    throw new Error('Failed to check if the title is not used.')
  }
}

export const createNewBlueprintPack = async (blueprintPack: BlueprintPack, blueprintIds: number[]) => {
  if (!blueprintPack || !blueprintIds || blueprintIds.length === 0) {
    throw new Error('Invalid blueprint pack or blueprints data.')
  }

  try {
    // Check if a blueprint with the same title already exists
    const isTitleUsed = await checkIfTitleIsUsed(blueprintPack.title)

    if (isTitleUsed) {
      throw new Error('A blueprint with this title already exists.')
    }

    const [newBlueprintPack] = await db.insert(BlueprintPack)
      .values(blueprintPack)
      .returning({
        id: BlueprintPack.id,
        title: BlueprintPack.title,
        description: BlueprintPack.description,
        images: BlueprintPack.images,
        categories: BlueprintPack.categories,
        videoUrl: BlueprintPack.videoUrl,
        pioneerName: BlueprintPack.pioneerName,
        createdAt: BlueprintPack.createdAt
      })

    // Insert the blueprints into the BlueprintPackBlueprints table
    await db.insert(BlueprintPackBlueprints).values(blueprintIds.map(blueprintId => ({
      blueprintPackId: newBlueprintPack.id,
      blueprintId: blueprintId
    })))

    // Get the full blueprint pack with the blueprints included
    const fullBlueprintPack = {
      blueprints: await db
        .select({
          id: Blueprint.id,
          title: Blueprint.title,
          images: Blueprint.images,
          averageRating: Blueprint.averageRating
        })
        .from(Blueprint)
        .innerJoin(
          BlueprintPackBlueprints,
          eq(Blueprint.id, BlueprintPackBlueprints.blueprintId)
        )
        .where(eq(BlueprintPackBlueprints.blueprintPackId, newBlueprintPack.id)),
      ...newBlueprintPack
    }

    // Return the newly created blueprint pack with blueprints
    return fullBlueprintPack
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.message === 'A blueprint with this title already exists.') {
      throw error
    }
    throw new Error('Failed to create the blueprint.')
  }
}

export const updateBlueprintPackProperties = async (blueprintPackId: number, blueprintPack: {
  description: BlueprintPack["description"],
  images: BlueprintPack["images"],
  categories: BlueprintPack["categories"],
  videoUrl: BlueprintPack["videoUrl"],
}) => {
  try {
    const updatedBlueprintPack = await db.update(BlueprintPack)
      .set({
        ...blueprintPack,
        updatedAt: sql`now()`
      })
      .where(eq(BlueprintPack.id, blueprintPackId))
      .returning({
        id: BlueprintPack.id
      })

    return updatedBlueprintPack[0]
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update the blueprint pack.')
  }
}

export const updateBlueprintPackBlueprints = async (blueprintPackId: number, blueprintIds: number[]) => {
  if (!blueprintIds || blueprintIds.length < 2) {
    throw new Error('At least 2 blueprints must be in a blueprint pack.')
  }

  try {
    // Delete existing blueprints for the blueprint pack, getting the array of ids of the deleted blueprints
    const deletedBlueprints = await db.delete(BlueprintPackBlueprints)
      .where(eq(BlueprintPackBlueprints.blueprintPackId, blueprintPackId))
      .returning({
        blueprintId: BlueprintPackBlueprints.blueprintId
      })

    // Convert the deleted blueprint ids to an array of numbers
    const deletedBlueprintIds = deletedBlueprints.map(deleted => deleted.blueprintId)

    // Insert the new blueprints into the BlueprintPackBlueprints table, getting the ids of the new blueprints
    await db.insert(BlueprintPackBlueprints).values(blueprintIds.map(blueprintId => ({
      blueprintPackId: blueprintPackId,
      blueprintId: blueprintId
    })))

    // Remove duplicates
    const updatedBlueprintIds = [...deletedBlueprintIds, ...blueprintIds].filter((value, index, self) => self.indexOf(value) === index)

    // Return the id's of the updated blueprints
    return updatedBlueprintIds
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update the blueprint pack blueprints.')
  }
}

export const deleteBlueprintPackById = async (blueprintPackId: number) => {
  try {
    // 1. Delete the blueprintPack ratings
    await db.delete(BlueprintPackRating)
      .where(eq(BlueprintPackRating.blueprintPackId, blueprintPackId))

    // 2. Delete the blueprintPackBlueprints, getting the array of ids of the deleted blueprints
    const deletedBlueprints = await db.delete(BlueprintPackBlueprints)
      .where(eq(BlueprintPackBlueprints.blueprintPackId, blueprintPackId))
      .returning({
        blueprintId: BlueprintPackBlueprints.blueprintId
      })

    // Convert the deleted blueprint ids to an array of numbers
    const deletedBlueprintIds = deletedBlueprints.map(deleted => deleted.blueprintId)

    // 3. Delete the blueprintPack
    const [deletedBlueprintPack] = await db.delete(BlueprintPack)
      .where(eq(BlueprintPack.id, blueprintPackId))
      .returning({
        id: BlueprintPack.id
      })

    return {
      id: deletedBlueprintPack.id,
      deletedBlueprintIds: deletedBlueprintIds
    }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to delete the blueprint pack.')
  }
}

export const getPageCountAndBlueprintPacksByPage = async (
  page: number,
  category?: Blueprint["categories"][number],
  sort?: string
) => {
  const offset = (page - 1) * blueprintPacksPerPage

  if (page < 1) {
    return {
      pageCount: 0,
      blueprintPacks: []
    }
  }

  try {
    const blueprintPacks = await db.query.BlueprintPack.findMany({
      where: sql`${BlueprintPack.categories} @> ARRAY[${category}]::"category"[]`,
      orderBy: sort === 'oldest' ? BlueprintPack.createdAt :
        sort === 'rating' ? desc(BlueprintPack.averageRating) :
          desc(BlueprintPack.createdAt),
      limit: blueprintPacksPerPage,
      offset,
      columns: {
        id: true,
        title: true,
        images: true,
        averageRating: true
      }
    })

    // Get all blueprintPack ids
    const packsWithCounts = await Promise.all(blueprintPacks.map(async (pack) => {
      const blueprintCount = await db.select({ value: count() })
        .from(BlueprintPackBlueprints)
        .where(eq(BlueprintPackBlueprints.blueprintPackId, pack.id))

      return {
        blueprintCount: blueprintCount[0].value,
        ...pack,
      }
    }))

    const pageCount = await getPageCount(category)

    return { pageCount, blueprintPacks: packsWithCounts }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprints.')
  }
}

export const getPageCount = cache(async (category?: BlueprintPack["categories"][number]) => {
  try {
    const totalBlueprintPacks = (await db.select({ value: count() }).from(BlueprintPack).where(
      category ? sql`${BlueprintPack.categories} @> ARRAY[${category}]::"category"[]` : undefined
    ))[0].value

    const pageCount = Math.ceil(totalBlueprintPacks / blueprintPacksPerPage)

    return pageCount
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the page count.')
  }
})