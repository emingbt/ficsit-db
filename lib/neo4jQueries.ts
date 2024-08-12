const itemsQuery = `
    MATCH (i:Item)
    RETURN i.slug AS slug, i.name AS name, i.imgUrl AS imgUrl
    ORDER BY i.slug
  `

const itemQuery = `
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

const buildingsQuery = `
    MATCH (:Category {name: $name})--(c:Category)--(b:Building)
    WITH c, b
    ORDER BY b.buildMenuPriority ASC
    WITH c, COLLECT({slug: b.slug, name: b.name, imgUrl: b.imgUrl}) AS buildings
    ORDER BY c.buildMenuPriority
    RETURN c.name AS name, buildings
  `
const buildingQuery = `
    MATCH (br:BuildingRecipe)-[:PRODUCES]->(b:Building {slug: $slug})
    MATCH (bri:Item)-[brr:USED_IN]->(br)
    WITH b, COLLECT(DISTINCT {slug: bri.slug, name: bri.name, imgUrl: bri.imgUrl, amount: brr.amount}) AS cost
    OPTIONAL MATCH (resource:Item)-[:EXTRACTED_BY]->(b)
    WITH b, cost, COLLECT({slug:resource.slug, name:resource.name, imgUrl:resource.imgUrl}) AS resources
    WITH b, cost, CASE WHEN resources[0].slug IS NULL THEN [] ELSE resources END AS resources
    OPTIONAL MATCH (f:Fuel)-[:USED_BY]->(b)
    OPTIONAL MATCH (f)-[r]-(i:Item)
    WITH b, cost, resources, f, COLLECT({slug: i.slug, imgUrl:i.imgUrl, isFluid:i.isFluid, type:type(r), rate:r.rate}) AS items
    WITH b, cost, resources, COLLECT(f{.*, items}) AS fuels
    OPTIONAL MATCH (pr:ProductionRecipe)-[:PRODUCES_IN]->(b)
    OPTIONAL MATCH (ingredient:Item)-[u:USED_IN]->(pr)-[p:PRODUCES]->(product:Item)
    WITH b, cost, resources, fuels, pr, COLLECT(DISTINCT {name: ingredient.slug, imgUrl: ingredient.imgUrl, isFluid: ingredient.isFluid, amount: u.amount}) AS ingredients, COLLECT(DISTINCT {name: product.slug, imgUrl: product.imgUrl, isFluid: product.isFluid, amount: p.amount}) AS products
    WITH b, cost, resources, fuels, pr, ingredients, products, pr{.*, ingredients: ingredients, products: products, building: {slug:b.slug, imgUrl:b.imgUrl}} AS recipe
    WITH b, cost, resources, fuels, COLLECT(DISTINCT recipe) AS recipes
    RETURN b{.*, cost:cost, resources:resources} AS building, recipes, fuels
  `

const recipeQuery = `
    MATCH (i:Item)-[r1:USED_IN]->(recipe:ProductionRecipe {slug: $slug})-[r2:PRODUCES]->(p:Item)
    MATCH (recipe)-[:PRODUCES_IN]->(b:Building)
    WITH recipe, b , COLLECT(DISTINCT {slug:i.slug, name:i.name, amount:r1.amount, imgUrl:i.imgUrl, isFluid:i.isFluid}) AS ingredients, COLLECT(DISTINCT {slug:p.slug, name:p.name, amount:r2.amount, imgUrl:p.imgUrl, isFluid:p.isFluid}) AS products
    RETURN properties(recipe{.*, ingredients:ingredients, products:products, building: {slug:b.slug, name:b.name, imgUrl:b.imgUrl, consumption:b.powerConsumption, exponent:b.overclockExponent}}) AS recipe
  `

const searchQuery = `
    OPTIONAL MATCH (i:Item)
    WHERE toLower(i.name) =~ $regex
    OPTIONAL MATCH (b:Building)
    WHERE toLower(b.name) =~ $regex
    WITH
      COLLECT(DISTINCT CASE WHEN i IS NOT NULL THEN { slug: i.slug, name: i.name, imgUrl: i.imgUrl } ELSE NULL END) AS items,
      COLLECT(DISTINCT CASE WHEN b IS NOT NULL THEN { slug: b.slug, name: b.name, imgUrl: b.imgUrl } ELSE NULL END) AS buildings
    RETURN items, buildings
  `

const Neo4jQueries = {
  itemsQuery,
  itemQuery,
  buildingsQuery,
  buildingQuery,
  recipeQuery,
  searchQuery
}

export default Neo4jQueries