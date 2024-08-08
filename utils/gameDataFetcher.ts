'use server'

import executeQuery from "./neo4j"
import Neo4jQueries from "../lib/neo4jQueries"
import { Building, BuildingData, Item, ItemData, ProductionRecipe, SearchData } from "../interfaces"

export async function getItems() {
  const query = Neo4jQueries.itemsQuery

  return await executeQuery(query) as Item[]
}

export async function getItem(slug: string) {
  if (!slug || slug == '') {
    return
  }

  const query = Neo4jQueries.itemQuery

  const params = { slug: slug }

  const result = await executeQuery(query, params)

  if (result == undefined || result.length == 0) {
    return
  }

  return result[0] as ItemData
}

export async function getBuildings(category: string) {
  if (!category || category == '') {
    return []
  }

  const query = Neo4jQueries.buildingsQuery

  const params = { name: category }

  return await executeQuery(query, params) as Building[]
}

export async function getBuilding(slug: string) {
  if (!slug || slug == '') {
    return
  }

  const query = Neo4jQueries.buildingQuery

  const params = { slug: slug }

  const result = await executeQuery(query, params)

  if (result == undefined || result.length == 0) {
    return
  }

  return result[0] as BuildingData
}

export async function getRecipe(slug: string) {
  if (!slug || slug == '') {
    return
  }

  const query = Neo4jQueries.recipeQuery

  const params = { slug: slug }

  const result = await executeQuery(query, params)

  if (result == undefined || result.length == 0) {
    return
  }

  return result[0].recipe as ProductionRecipe
}

export async function getSearch(name: string) {
  if (!name || name == '') {
    return
  }

  const query = Neo4jQueries.searchQuery

  const params = { regex: `.*${name}.*` }

  const result = await executeQuery(query, params)

  if (result == undefined || result.length == 0) {
    return
  }

  return result[0] as SearchData
}