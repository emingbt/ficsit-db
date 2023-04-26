import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../utils/neo4j";

export default async function Item(req: NextApiRequest, res: NextApiResponse) {
  const query = `
    MATCH (i:Item)
    RETURN i.slug AS slug, i.name AS name, i.imgUrl AS imgUrl
    ORDER BY i.slug
  `;

  const result = await executeQuery(query);

  res.status(200).json(result);
}