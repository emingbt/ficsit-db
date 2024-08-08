import 'server-only'

import db from '../utils/postgres'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { Pioneer } from '../drizzle/schema'
import { UpdateAvatarFormSchema } from '../utils/zod'

export const getPioneerByEmail = cache(async (email: string) => {
  try {
    const data = await db.query.Pioneer.findFirst({
      where: eq(Pioneer.email, email),

      columns: {
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