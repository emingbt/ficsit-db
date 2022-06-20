const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const buildingSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: [
      'production',
      'power',
      'logistics',
      'organization',
      'transportation',
      'foundations',
      'walls'
    ],
    required: true
  },
  cost: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        autopopulate: true
      }
    }
  ],
  details: {
    type: Object
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      autopopulate: true
    }
  ],
  extractableResources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      autopopulate: true
    }
  ],
  fuels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      autopopulate: true
    }
  ]
})

class Building {
  async addRecipe(recipe) {
    this.recipes.push(recipe)
    await this.save()
  }

  async addExtractableResource(resource) {
    this.extractableResources.push(resource)
    await this.save()
  }

  async addUseableFuel(resource) {
    this.fuels.push(resource)
    await this.save()
  }
}

buildingSchema.loadClass(Building)
buildingSchema.plugin(autopopulate)

module.exports = mongoose.model('Building', buildingSchema)