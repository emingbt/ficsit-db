import { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../utils/neo4j'

export default async function Items(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query || 'computers'

  const query = `
    MATCH (i:Item {slug: $slug})
    OPTIONAL MATCH (r1:ProductionRecipe)-[:PRODUCES]->(i)
    OPTIONAL MATCH (i)-[:USED_IN]->(r2:ProductionRecipe)
    OPTIONAL MATCH (ingredient:Item)-[u:USED_IN]->(r1:ProductionRecipe)-[p:PRODUCES]->(product:Item)
    WITH r1, i, r2, COLLECT(DISTINCT {slug: ingredient.slug, imgUrl: ingredient.imgUrl, isFluid: ingredient.isFluid, amount: u.amount}) AS r1Ingredients, COLLECT(DISTINCT {slug: product.slug, imgUrl: product.imgUrl, isFluid: product.isFluid, amount: p.amount}) AS r1Products
    OPTIONAL MATCH (ingredient:Item)-[u:USED_IN]->(r2:ProductionRecipe)-[p:PRODUCES]->(product:Item)
    WITH r1, i ,r2, r1Ingredients, r1Products, COLLECT(DISTINCT {slug: ingredient.slug, imgUrl: ingredient.imgUrl, isFluid: ingredient.isFluid, amount: u.amount}) AS r2Ingredients, COLLECT(DISTINCT {slug: product.slug, imgUrl: product.imgUrl, isFluid: product.isFluid, amount: p.amount}) AS r2Products
    WITH i, COLLECT(DISTINCT properties(r1{.*, products:r1Products, ingredients:r1Ingredients})) AS recipes, COLLECT(DISTINCT properties( r2{.*, products:r2Products, ingredients:r2Ingredients})) AS usagesAsIngredient
    RETURN recipes, usagesAsIngredient, properties(i) AS item
  `

  const params = { slug: slug }

  const result = await executeQuery(query, params)

  if (result == undefined || result.length === 0) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json(result[0])
}