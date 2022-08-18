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
    production: [
      'Manufacturers',
      'Smelters',
      'Miners',
      'FluidExtractors'
    ],
    power: [
      'Generators',
      'PowerPoles',
      'WallPoles'
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
    if (categories[`${category}`].includes(...buildables[i].categories)) {
      buildings[`${buildables[i].categories}`].push(buildables[i])
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
}