const Item = require("./item")
const Building = require("./building")
const Recipe = require("./recipe")

const copperOre = new Item (
  "Copper Ore",
  "Ore, just ore",
  "images/blablabla.png",
  {
    sinkPoints: 3,
    stackSize: 100,
    radioactive: false
  }
)

console.log(copperOre)

const smelter = new Building(
  "Smelter", 
  "It smelts... -_-",
  "images/blablabla.png",
  "production",
  [
    {quantity: 5, item: "ironRod"},
    {quantity: 8, item: "wire"}
  ]
)

console.log(smelter)

const copperIngotRecipe = new Recipe(
  "Copper Ingot",
  false,
  [{quantity: 1, item: copperOre}],
  [{quantity: 1, item: "copperIngot"}],
  {period: 2, building: smelter}
)

console.log(copperIngotRecipe)