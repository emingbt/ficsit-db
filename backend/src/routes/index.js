const express = require('express')
const router = express.Router()

const Item = require('../models/item')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'FICSIT DB' })
})

module.exports = router