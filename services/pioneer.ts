import 'server-only'

import db from '../utils/postgres'
import { desc, eq, sql } from 'drizzle-orm'
import { cache } from 'react'
import { Blueprint, Pioneer } from '../drizzle/schema'
import { CreatePioneerFormSchema, UpdateAvatarFormSchema } from '../utils/zod'

export const getPioneerByName = cache(async (name: string) => {
  try {
    const data = await db.query.Pioneer.findFirst({
      where: eq(Pioneer.name, name.toLowerCase()),

      columns: {
        name: true,
        avatar: true,
        color: true,
        createdAt: true
      }
    })

    return data
  } catch (error) {
    console.log(error)
    return
  }
})

export const getPioneerByEmail = cache(async (email: string) => {
  try {
    const data = await db.query.Pioneer.findFirst({
      where: eq(Pioneer.email, email),

      columns: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        color: true,
        createdAt: true
      }
    })

    return data
  } catch (error) {
    console.log(error)
    return
  }
})

export const createNewPioneer = async (kindeData: { email: string, kindeId: string }, formData: { name: string, avatar: string, color: string }) => {
  const validationResults = CreatePioneerFormSchema.safeParse(formData)

  if (!validationResults.success) {
    throw new Error('Invalid pioneer properties.')
  }

  const { name, avatar, color } = validationResults.data

  try {
    const pioneer = await db
      .insert(Pioneer)
      .values({
        name,
        email: kindeData.email,
        avatar,
        color,
        kindeId: kindeData.kindeId,
      })
      .returning({ name: Pioneer.name, avatar: Pioneer.avatar, color: Pioneer.color })

    return pioneer
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create the pioneer.')
  }
}

export const updatePioneerAvatar = async (email: string, newAvatar: string, newColor: string) => {
  const validationResults = UpdateAvatarFormSchema.safeParse({
    avatar: newAvatar,
    color: newColor,
  })

  if (!validationResults.success) {
    throw new Error('Invalid avatar or color.')
  }

  const { avatar, color } = validationResults.data

  try {
    await db.update(Pioneer)
      .set({
        avatar,
        color
      })
      .where(eq(Pioneer.email, email))
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update the pioneer avatar.')
  }
}

export const getAllPioneersByName = cache(async (name: string, pioneerCount = 60) => {
  if (!name || name.trim() == '') {
    return []
  }

  try {
    const data = await db.query.Pioneer.findMany({
      where: sql`LOWER(${Pioneer.name}) LIKE ${`%${name.toLowerCase()}%`}`,
      orderBy: desc(Pioneer.createdAt),
      limit: pioneerCount,
      columns: {
        name: true,
        avatar: true,
        color: true
      }
    })

    return data
  } catch (error) {
    console.log("Error fetching pioneers by name:", error)
    return []
  }
})

export const getPioneersWithBlueprintStats = cache(async () => {
  try {
    const result = await db
      .select({
        name: Pioneer.name,
        color: Pioneer.color,
        avatar: Pioneer.avatar,
        blueprints: sql<number>`COUNT(${Blueprint.id})`.as('blueprints'),
        downloads: sql<number>`SUM(${Blueprint.downloads})`.as('downloads')
      })
      .from(Pioneer)
      .innerJoin(Blueprint, eq(Pioneer.name, Blueprint.pioneerName))
      .groupBy(Pioneer.name, Pioneer.color, Pioneer.avatar)
      .having(sql`COUNT(${Blueprint.id}) > 0`)

    return result
  } catch (error) {
    console.log("Error fetching pioneers with blueprint stats:", error)
    return []
  }
})