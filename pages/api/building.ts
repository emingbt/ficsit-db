import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../utils/neo4j";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  const query = `
    MATCH (br:BuildingRecipe)-[:PRODUCES]->(b:Building {slug: $slug})
    MATCH (bri:Item)-[brr:USED_IN]->(br)
    WITH b, COLLECT(DISTINCT {slug: bri.slug, name: bri.name, imgUrl: bri.imgUrl, amount: brr.amount}) AS cost
    OPTIONAL MATCH (resource:Item)-[:EXTRACTED_BY]->(b)
    WITH b, cost, COLLECT({slug:resource.slug, name:resource.name, imgUrl:resource.imgUrl}) AS resources
    WITH b, cost, CASE WHEN resources[0].slug IS NULL THEN [] ELSE resources END AS resources
    OPTIONAL MATCH (f:Fuel)-[:USED_BY]->(b)
    OPTIONAL MATCH (f)-[r]-(i:Item)
    WITH b, cost, resources, f, COLLECT({slug: i.slug, imgUrl:i.imgUrl, type:type(r), rate:r.rate}) AS items
    WITH b, cost, resources, COLLECT(f{.*, items}) AS fuels
    OPTIONAL MATCH (pr:ProductionRecipe)-[:PRODUCES_IN]->(b)
    OPTIONAL MATCH (ingredient:Item)-[u:USED_IN]->(pr)-[p:PRODUCES]->(product:Item)
    WITH b, cost, resources, fuels, pr, COLLECT(DISTINCT {name: ingredient.slug, imgUrl: ingredient.imgUrl, amount: u.amount}) AS ingredients, COLLECT(DISTINCT {name: product.slug, imgUrl: product.imgUrl, amount: p.amount}) AS products
    WITH b, cost, resources, fuels, pr, ingredients, products, pr{.*, ingredients: ingredients, products: products, building: {slug:b.slug, name:b.slug, imgUrl:b.imgUrl}} AS recipe
    WITH b, cost, resources, fuels, COLLECT(DISTINCT recipe) AS recipes
    RETURN b{.*, cost:cost, resources:resources} AS building, recipes, fuels
  `;

  const params = {
    slug: slug
  };

  const result = await executeQuery(query, params);

  res.status(200).json(result[0]);
}