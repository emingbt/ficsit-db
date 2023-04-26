import { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../utils/neo4j'

export default async function Items(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query

  const query = `
    MATCH (i:Item {slug: $slug})
    OPTIONAL MATCH (r1:ProductionRecipe)-[:PRODUCES]->(i)
    OPTIONAL MATCH (i)-[:USED_IN]->(r2:ProductionRecipe)
    OPTIONAL MATCH (ingredient:Item)-[u:USED_IN]->(r1:ProductionRecipe)-[p:PRODUCES]->(product:Item)
    WITH r1, i, r2, COLLECT(DISTINCT {name: ingredient.slug, imgUrl: ingredient.imgUrl, amount: u.amount}) AS r1Ingredients, COLLECT(DISTINCT {name: product.slug, imgUrl: product.imgUrl, amount: p.amount}) AS r1Products
    OPTIONAL MATCH (ingredient:Item)-[u:USED_IN]->(r2:ProductionRecipe)-[p:PRODUCES]->(product:Item)
    WITH r1, i ,r2, r1Ingredients, r1Products, COLLECT(DISTINCT {name: ingredient.slug, imgUrl: ingredient.imgUrl, amount: u.amount}) AS r2Ingredients, COLLECT(DISTINCT {name: product.slug, imgUrl: product.imgUrl, amount: p.amount}) AS r2Products
    OPTIONAL MATCH (r1)-[:PRODUCES_IN]->(b1:Building)
    OPTIONAL MATCH (r2)-[:PRODUCES_IN]->(b2:Building)
    WITH i, COLLECT(DISTINCT properties(r1{.*, products:r1Products, ingredients:r1Ingredients, building: {slug: b1.slug, imgUrl: b1.imgUrl}})) AS recipes, COLLECT(DISTINCT properties( r2{.*, products:r2Products, ingredients:r2Ingredients, building: {slug: b2.slug, imgUrl: b2.imgUrl}})) AS usagesAsIngredient
    RETURN recipes, usagesAsIngredient, properties(i) AS item
  `

  const params = { slug: slug }

  const result = await executeQuery(query, params)

  res.status(200).json(result[0])
}