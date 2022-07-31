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
  console.log(name)
  const item = gameData.items[name]

  return item
}