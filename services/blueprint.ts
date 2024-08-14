import 'server-only'

import db from '../utils/postgres'
import { eq } from 'drizzle-orm'
import { Blueprint } from '../drizzle/schema'

export const getBlueprintByTitle = async (title: string) => {
  try {
    const blueprint = await db.query.Blueprint.findFirst({
      where: eq(Blueprint.title, title),
      columns: {
        title: true,
        description: true,
        images: true,
        files: true,
        categories: true,
        pioneerName: true,
        createdAt: true
      }
    })

    return blueprint
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