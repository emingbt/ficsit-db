import 'server-only'

import db from '../utils/postgres'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { Pioneer } from '../drizzle/schema'
import { CreatePioneerFormSchema, UpdateAvatarFormSchema } from '../utils/zod'

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