import fs from 'fs'
import { join } from 'path'

export function getAllItems() {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)
  const allItems = gameData.items

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

export function getBuildingsByCategory(category) {
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

  const buildables = Object.values(gameData.buildables)
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

  return buildings
}

export function getRecipesByItemName(name) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const allRecipes = Object.values(gameData.productionRecipes)

  let itemRecipes = []

  allRecipes.map((recipe) => {
    if (recipe.products.some(item => item.itemClass == `${name}`)) {
      itemRecipes.push(recipe)
    }
  })

  return itemRecipes
}

export function getUsagesAsIngredientByItemName(name) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const allRecipes = Object.values(gameData.productionRecipes)

  let usagesAsIngredient = []

  allRecipes.map((recipe) => {
    if (recipe.ingredients.some(item => item.itemClass == `${name}`)) {
      usagesAsIngredient.push(recipe)
    }
  })

  return usagesAsIngredient
}

export function getBuildableByName(name) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const buildable = gameData.buildables[`${name}`]

  let ingredients = getBuildableRecipeByName(name)
  buildable.cost = ingredients

  return buildable
}

export function getBuildableRecipeByName(name) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const buildableRecipe = gameData.buildableRecipes[`${name}-recipe`]

  return buildableRecipe.ingredients
}

export function getRecipesByBuildingName(name) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const allRecipes = Object.values(gameData.productionRecipes)

  let recipes = []

  allRecipes.map((e) => {
    if (e.producedIn == name) {
      recipes.push(e)
    }
  })

  return recipes
}

export function getFilteredItemsByName(name) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const items = Object.values(gameData.items)
    .filter(item => item.name.toLowerCase().includes(name.toLowerCase()))

  const buildables = Object.values(gameData.buildables)
    .filter(buildables => buildables.name.toLowerCase().includes(name.toLowerCase()))

  return { items, buildables }
}

export function getRecipeByRecipeName(name) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)
  const allRecipes = gameData.productionRecipes

  const recipe = allRecipes[name]

  let updatedIngredients = recipe.ingredients.map((ingredient) => {
    let item = getItemDetailsByItemName(ingredient.itemClass)
    item['quantity'] = ingredient.quantity

    return item
  })

  let updatedProducts = recipe.products.map((product) => {
    let item = getItemDetailsByItemName(product.itemClass)
    item['quantity'] = product.quantity

    return item
  })

  recipe.ingredients = updatedIngredients
  recipe.products = updatedProducts

  return recipe
}

export function getItemDetailsByItemName(name) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const item = gameData.items[name]

  return item
}