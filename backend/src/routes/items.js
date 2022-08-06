var express = require('express');
var router = express.Router();

const Item = require('../models/item')
const Building = require('../models/building')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const allItems = await Item.find({})

  res.render('items', { allItems })
})

router.post('/', async (req, res, next) => {
  await Item.create({
    name: 'Iron Ore',
    description: 'Used for crafting. The most essential basic resource.',
    image: "images/blabla",
    details: {
      sinkPoints: 1,
      stackSize: 100,
      radioactive: false
    }
  })

  await Item.create({
    name: 'Copper Ore',
    description: 'Used for crafting. Basic resource mainly used for electricity',
    image: "images/blabla",
    details: {
      sinkPoints: 3,
      stackSize: 100,
      radioactive: false
    }
  })

  await Item.create({
    name: 'Limestone',
    description: 'Used for crafting. Basic resource mainly used for stable foundations',
    image: "images/blabla",
    details: {
      sinkPoints: 2,
      stackSize: 100,
      radioactive: false
    }
  })

  await Item.create({
    name: 'Limestone',
    description: 'Used for crafting. Basic resource mainly used for stable foundations',
    image: "images/blabla",
    details: {
      sinkPoints: 2,
      stackSize: 100,
      radioactive: false
    }
  })

  await Item.create({
    name: 'Iron Ingot',
    description: 'Used for crafting. Crafted into the most basic parts.',
    image: "images/blabla",
    details: {
      sinkPoints: 2,
      stackSize: 100,
      radioactive: false
    }
  })

  await Item.create({
    name: 'Copper Ingot',
    description: 'Used for crafting. Crafted into the most basic parts.',
    image: "images/blabla",
    details: {
      sinkPoints: 6,
      stackSize: 100,
      radioactive: false
    }
  })

  const wire = await Item.create({
    name: 'Wire',
    description: 'Used for crafting. One of the most basic parts.',
    image: "images/blabla",
    details: {
      sinkPoints: 6,
      stackSize: 500,
      radioactive: false
    }
  })

  const ironRod = await Item.create({
    name: 'Iron Rod',
    description: 'Used for crafting. One of the most basic parts.',
    image: "images/blabla",
    details: {
      sinkPoints: 4,
      stackSize: 200,
      radioactive: false
    }
  })

  const smelter = await Building.create({
    name: 'Smelter',
    description: 'Smelts ore into ingots. Can be automated by feeding ore into it with a conveyor belt connected to the input. The produced ingots can be automatically extracted by connecting a conveyor belt to the output.',
    image: 'images/blablalbla',
    type: 'production',
    cost: [
      {
        quantity: 5,
        item: ironRod
      },
      {
        quantity: 8,
        item: wire
      }
    ],
    details: {
      powerConsumption: 4
    }
  })

  res.status(200).send(copperOre)
})

module.exports = router;