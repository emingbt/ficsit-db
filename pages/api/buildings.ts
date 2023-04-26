import { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../utils/neo4j'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { category } = req.query

  const query = `
      MATCH (:Category {name: $name})--(c:Category)--(b:Building)
      WITH c, b
      ORDER BY b.buildMenuPriority ASC
      WITH c, COLLECT({slug: b.slug, name: b.name, imgUrl: b.imgUrl}) AS buildings
      ORDER BY c.buildMenuPriority
      RETURN c.name AS name, buildings
    `

  const params = {
    name: category
  }

  const result = await executeQuery(query, params)

  return res.status(200).json(result)
}