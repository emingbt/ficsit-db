import 'server-only'

import { cache } from 'react'
import db from '../utils/postgres'
import { count, desc, eq } from 'drizzle-orm'
import { Blueprint } from '../drizzle/schema'

const blueprintsPerPage = 30

export const getBlueprintById = async (id: number) => {
  try {
    const blueprint = await db.query.Blueprint.findFirst({
      where: eq(Blueprint.id, id),
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

export const getPageCountAndBlueprintsByPage = async (page: number) => {
  const offset = (page - 1) * blueprintsPerPage

  if (page < 1) {
    return {
      pageCount: 0,
      blueprints: []
    }
  }

  try {
    const blueprints = await db.select().from(Blueprint)
      .orderBy(desc(Blueprint.id))
      .limit(blueprintsPerPage)
      .offset(offset)

    const pageCount = await getPageCount()

    return { pageCount, blueprints }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the blueprints.')
  }
}

export const getPageCount = cache(async () => {
  try {
    const totalBlueprints = (await db.select({ value: count() }).from(Blueprint))[0].value

    const pageCount = Math.ceil(totalBlueprints / blueprintsPerPage)

    return pageCount
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get the page count.')
  }
})