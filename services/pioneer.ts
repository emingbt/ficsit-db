import 'server-only'

import db from '../utils/postgres'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { Pioneer } from '../drizzle/schema'

export const getPioneerByName = cache(async (name: string) => {
  try {
    const data = await db.query.Pioneer.findFirst({
      where: eq(Pioneer.name, name),

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