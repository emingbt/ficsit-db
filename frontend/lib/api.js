import fs from 'fs'
import { join } from 'path'

export function getAllItems() {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)
  const allItems = gameData.items

  return allItems
}

export function getItemByItemName( name ) {
  const filePath = join(process.cwd(), 'json/data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const gameData = JSON.parse(jsonData)

  const item = gameData.items[name]

  return item
}

export function getBuildingsByCategory( category ) {
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