import 'server-only'

import db from '../utils/postgres'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { Pioneer } from '../drizzle/schema'

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