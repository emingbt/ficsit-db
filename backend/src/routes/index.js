const express = require('express')
const router = express.Router()

const Item = require('../models/item')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'FICSIT DB' })
})

const item = new Item(
  "Copper Ore",
  "Ore, just ore",
  "images/blablabla.png",
  {
    sinkPoints: 3,
    stackSize: 100,
    radioactive: false
  }
)

/* GET one item. */
router.get('/items', (req, res, next) => {
  res.render('item', { item })
})

module.exports = router