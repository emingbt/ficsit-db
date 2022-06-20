const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
require('./recipe')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  details: {
    type: Object,
    sinkPoints: {
      type: Number,
      required: true
    },
    radioactive: {
      type: Boolean,
      default: false,
      required: true
    },
    stackSize: {
      type: Number
    },
    energyValue: {
      type: Number
    }
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      autopopulate: true
    }
  ],
  usagesAsIngredient: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      autopopulate: true
    }
  ],
  usagesForBuildings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      autopopulate: true
    }
  ]
})

class Item {
  async addRecipe(recipe) {
    this.recipes.push(recipe)
    await this.save()
  }

  async addUsageAsIngredient(recipe) {
    this.usagesAsIngredient.push(usageAsIngredient)
    await this.save()
  }

  async addUsageForBuildings(recipe) {
    this.usagesForBuildings.push(usageForBuildings)
    await this.save()
  }
}

itemSchema.loadClass(Item)
itemSchema.plugin(autopopulate)

module.exports = mongoose.model('Item', itemSchema)