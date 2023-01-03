import fs from 'fs'
import { join } from 'path'
import { Item, ItemMap, Building, ProductionRecipe, BuildingRecipe } from '../interfaces'

export function getAllItems() {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)
  const allItems: ItemMap = gameData.items

  return allItems
}

export function getItemByItemName(name) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const item = gameData.items[name]
  const recipes = getRecipesByItemName(name)
  const usagesAsIngredient = getUsagesAsIngredientByItemName(name)

  return { item, recipes, usagesAsIngredient }
}

export function getBuildingsByCategory(category: string) {
  const categories = {
    special: [
      'Special'
    ],
    production: [
      'Manufacturers',
      'Smelters',
      'Miners',
      'FluidExtractors',
      'Workstations'
    ],
    power: [
      'Generators',
      'PowerPoles',
      'WallOutlets'
    ],
    logistics: [
      'ConveyorBelts',
      'ConveyorLifts',
      'ConveyorSupports',
      'Pipelines',
      'PipelineSupports',
      'Sorting'
    ],
    organisation: [
      'Lights',
      'Signs',
      'Storage',
      'Towers'
    ],
    transportation: [
      'VehicleTransport',
      'Hypertubes',
      'RailwayTransport',
      'JumpPads'
    ],
    foundations: [
      'Foundations',
      'Ramps',
      'InvertedRamps',
      'QuarterPipes'
    ],
    walls: [
      'BasicWalls',
      'RampWalls',
      'InvertedRampWalls',
      'TiltedWalls',
      'Windows',
      'Doors',
      'ConveyorConnections'
    ],
    architecture: [
      'Frames',
      'Roofs',
      'Beams',
      'Pillars',
      'Attachments',
      'Catwalks',
      'Walkways'
    ]
  }

  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const buildables: Building[] = Object.values(gameData.buildables)
  let buildings = {}

  for (let i = 0; i < categories[`${category}`].length; i++) {
    buildings[`${categories[`${category}`][i]}`] = []
  }

  for (let i = 0; i < buildables.length; i++) {
    if (categories[`${category}`].includes(buildables[i].categories[1])) {
      buildings[`${buildables[i].categories[1]}`].push(buildables[i])
    }
  }

  Object.keys(buildings).map((e) => {
    return { [`${e}`]: buildings[`${e}`].sort((a, b) => a.buildMenuPriority - b.buildMenuPriority) }
  })

  return {...buildings}
}

export function getRecipesByItemName(name: string) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const allRecipes: ProductionRecipe[] = Object.values(gameData.productionRecipes)

  let itemRecipes = []

  allRecipes.map((recipe) => {
    if (recipe.products.some(item => item.itemClass == `${name}`)) {
      itemRecipes.push(recipe)
    }
  })

  return itemRecipes
}

export function getUsagesAsIngredientByItemName(name: string) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const allRecipes: ProductionRecipe[] = Object.values(gameData.productionRecipes)

  let usagesAsIngredient = []

  allRecipes.map((recipe) => {
    if (recipe.ingredients.some(item => item.itemClass == `${name}`)) {
      usagesAsIngredient.push(recipe)
    }
  })

  return usagesAsIngredient
}

export function getBuildableByName(name: string) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const buildable:Building = gameData.buildables[`${name}`]

  let ingredients = getBuildableRecipeByName(name)
  buildable.cost = ingredients

  return buildable
}

export function getBuildableRecipeByName(name: string) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const buildableRecipe: BuildingRecipe = gameData.buildableRecipes[`${name}-recipe`]

  return buildableRecipe.ingredients
}

export function getRecipesByBuildingName(name: string) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const allRecipes: ProductionRecipe[] = Object.values(gameData.productionRecipes)

  const filteredRecipes = allRecipes.filter((recipe) => recipe.producedIn == name)

  return filteredRecipes
}

export function getFilteredItemsByName(name: string) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const items: Item[] = Object.values(gameData.items)
    .filter((item: Item) => item.name.toLowerCase().includes(name.toLowerCase()))

  const buildables: Building[] = Object.values(gameData.buildables)
    .filter((buildable: Building) => buildable.name.toLowerCase().includes(name.toLowerCase()))

  return { items, buildables }
}

export function getRecipeByRecipeName(name: string) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)
  const allRecipes: ProductionRecipe[] = gameData.productionRecipes

  const recipe: ProductionRecipe = allRecipes[name]

  let updatedIngredients = recipe.ingredients.map((ingredient) => {
    let item = getItemDetailsByItemName(ingredient.itemClass)
    ingredient['isFluid'] = item.isFluid
    ingredient['name'] = item.name

    return ingredient
  })

  let updatedProducts = recipe.products.map((product) => {
    let item = getItemDetailsByItemName(product.itemClass)
    product['isFluid'] = item.isFluid
    product['name'] = item.name

    return product
  })

  recipe.ingredients = updatedIngredients
  recipe.products = updatedProducts

  return recipe
}

export function getItemDetailsByItemName(name) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const item: Item = gameData.items[name]

  return item
}