import { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../utils/neo4j'

export default async function Search(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query

  const query = `
    OPTIONAL MATCH (i:Item)
    WHERE toLower(i.name) =~ $regex
    OPTIONAL MATCH (b:Building)
    WHERE toLower(b.name) =~ $regex
    WITH
      COLLECT(DISTINCT CASE WHEN i IS NOT NULL THEN { slug: i.slug, name: i.name, imgUrl: i.imgUrl } ELSE NULL END) AS items,
      COLLECT(DISTINCT CASE WHEN b IS NOT NULL THEN { slug: b.slug, name: b.name, imgUrl: b.imgUrl } ELSE NULL END) AS buildings
    RETURN items, buildings
  `

  const params = {
    regex: `.*${name}.*`
  }

  const result = await executeQuery(query, params)

  if (result == undefined || result.length === 0) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json(result[0])
}