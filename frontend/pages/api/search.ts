import { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../utils/neo4j'

export default async function Search(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query

  const query = `
  MATCH (i:Item)
  MATCH (c:Category)--(:Category)--(b:Building)
  WHERE toLower(i.name) =~ $regex AND toLower(b.name) =~ $regex
  RETURN COLLECT(DISTINCT {slug:i.slug, name:i.name, imgUrl:i.imgUrl}) AS items, COLLECT(DISTINCT {slug:b.slug, name:b.name, imgUrl:b.imgUrl, category: c.name}) AS buildings
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