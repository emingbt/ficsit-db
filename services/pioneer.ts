import 'server-only'

import db from '../utils/postgres'
import { and, desc, eq, sql } from 'drizzle-orm'
import { cache } from 'react'
import { Blueprint, Pioneer, SocialLink } from '../drizzle/schema'
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
        kindeId: kindeData.kindeId
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
        color,
        updatedAt: new Date()
      })
      .where(eq(Pioneer.email, email))
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update the pioneer avatar.')
  }
}

export const getPioneerSocialLinks = cache(async (pioneerName: string) => {
  try {
    // Check if the pioneerName is valid
    if (!pioneerName || pioneerName.trim() === '') {
      return []
    }

    // Fetch the pioneer by name
    const pioneer = await db.query.Pioneer.findFirst({
      where: eq(Pioneer.name, pioneerName.toLowerCase()),
      columns: {
        id: true
      }
    })

    // If the pioneer does not exist, return an empty array
    if (!pioneer) {
      return []
    }

    // Fetch the social links for the pioneer using the pioneer id
    const data = await db.query.SocialLink.findMany({
      where: eq(SocialLink.pioneerId, pioneer.id),
      columns: {
        platform: true,
        url: true
      }
    })

    return data
  } catch (error) {
    console.log("Error fetching social links for pioneer:", error)
    return []
  }
})

export const updatePioneerSocialLinks = async (pioneerName: string, socialLinks: { platform: SocialLink["platform"], url: SocialLink['url'] }[]) => {
  try {
    // Check if the pioneerName is valid
    if (!pioneerName || pioneerName.trim() === '') {
      throw new Error('Invalid pioneer name.')
    }

    // Fetch the pioneer by name
    const pioneer = await db.query.Pioneer.findFirst({
      where: eq(Pioneer.name, pioneerName.toLowerCase()),
      columns: {
        id: true
      }
    })

    // If the pioneer does not exist, throw an error
    if (!pioneer) {
      throw new Error('Pioneer not found.')
    }

    // Get the pioneer's current social links
    let currentSocialLinks = await getPioneerSocialLinks(pioneerName)

    // Update the existing social links
    for (const link of socialLinks) {
      const existingLink = currentSocialLinks.find(sl => sl.platform === link.platform)

      if (existingLink) {
        // Update existing link
        await db.update(SocialLink)
          .set({ url: link.url })
          .where(
            and(
              eq(SocialLink.pioneerId, pioneer.id),
              eq(SocialLink.platform, link.platform)
            )
          )

        // Remove from currentSocialLinks to avoid deletion later
        currentSocialLinks = currentSocialLinks.filter(sl => sl.platform !== link.platform)
      } else {
        // Insert new link
        await db.insert(SocialLink).values({
          pioneerId: pioneer.id,
          platform: link.platform,
          url: link.url
        })
      }
    }

    // Remove any social links that are no longer present
    for (const existingLink of currentSocialLinks) {
      await db.delete(SocialLink)
        .where(
          and(
            eq(SocialLink.pioneerId, pioneer.id),
            eq(SocialLink.platform, existingLink.platform)
          )
        )
    }

    // Update the pioneer's updatedAt timestamp
    await db.update(Pioneer)
      .set({ updatedAt: new Date() })
      .where(eq(Pioneer.id, pioneer.id))

  } catch (error) {
    console.log("Error updating social links for pioneer:", error)
    throw new Error('Failed to update social links.')
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
      .groupBy(Pioneer.name, Pioneer.color, Pioneer.avatar, Pioneer.createdAt)
      .having(sql`COUNT(${Blueprint.id}) > 0`)
      .orderBy(desc(Pioneer.createdAt))

    return result
  } catch (error) {
    console.log("Error fetching pioneers with blueprint stats:", error)
    return []
  }
})