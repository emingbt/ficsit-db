import executeQuery from "./neo4j"
import Neo4jQueries from "../lib/neo4jQueries"

export async function getItems() {
  const query = Neo4jQueries.itemsQuery

  return await executeQuery(query)
}

export async function getItem(slug: string) {
  if (!slug || slug == '') {
    return { message: 'Not found' }
  }

  const query = Neo4jQueries.itemQuery

  const params = { slug: slug }

  const result = await executeQuery(query, params)

  if (result == undefined || result.length == 0) {
    return { message: 'Not found' }
  }

  return result[0]
}

export async function getBuildings(category: string) {
  if (!category || category == '') {
    return { message: 'Not found' }
  }

  const query = Neo4jQueries.buildingsQuery

  const params = { name: category }

  return await executeQuery(query, params)
}

export async function getBuilding(slug: string) {
  if (!slug || slug == '') {
    return { message: 'Not found' }
  }

  const query = Neo4jQueries.buildingQuery

  const params = { slug: slug }

  const result = await executeQuery(query, params)

  if (result == undefined || result.length == 0) {
    return { message: 'Not found' }
  }

  return result[0]
}

export async function getRecipe(slug: string) {
  if (!slug || slug == '') {
    return { message: 'Not found' }
  }

  const query = Neo4jQueries.recipeQuery

  const params = { slug: slug }

  const result = await executeQuery(query, params)

  if (result == undefined || result.length == 0) {
    return { message: 'Not found' }
  }

  return result[0].recipe
}

export async function getSearch(name: string) {
  if (!name || name == '') {
    return { message: 'Not found' }
  }

  const query = Neo4jQueries.searchQuery

  const params = { regex: `.*${name}.*` }

  const result = await executeQuery(query, params)

  if (result == undefined || result.length == 0) {
    return { message: 'Not found' }
  }

  return result[0]
}