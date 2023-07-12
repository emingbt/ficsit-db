import { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../utils/neo4j'

export default async function Recipe(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query

  const query = `
    MATCH (i:Item)-[r1:USED_IN]->(recipe:ProductionRecipe {slug: $slug})-[r2:PRODUCES]->(p:Item)
    MATCH (recipe)-[:PRODUCES_IN]->(b:Building)
    WITH recipe, b , COLLECT(DISTINCT {slug:i.slug, name:i.name, amount:r1.amount, imgUrl:i.imgUrl, isFluid:i.isFluid}) AS ingredients, COLLECT(DISTINCT {slug:p.slug, name:p.name, amount:r2.amount, imgUrl:p.imgUrl, isFluid:p.isFluid}) AS products
    RETURN properties(recipe{.*, ingredients:ingredients, products:products, building: {slug:b.slug, name:b.name, imgUrl:b.imgUrl, consumption:b.powerConsumption, exponent:b.overclockExponent}}) AS recipe
  `

  const params = { slug: slug }

  const result = await executeQuery(query, params)

  if (result == undefined || result.length === 0) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json(result[0].recipe)
}