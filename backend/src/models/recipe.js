const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  alternate: {
    type: Boolean,
    default: false,
    required: true
  },
  ingredients: [
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
  products: [
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
  machine: {
    period: {
      type: Number
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building',
      autopopulate: true
    }
  }
})

class Recipe {
  async addIngredient(quantity, item) {
    this.ingredients.push({
      quantity: quantity,
      item: item
    })
    await this.save()
  }

  async addProduct(quantity, item) {
    this.products.push({
      quantity: quantity,
      item: item
    })
    await this.save()
  }

  async addBuilding(period, building) {
    this.machine = {
      period: period,
      building: building
    }
    await this.save()
  }
}

recipeSchema.loadClass(Recipe)
recipeSchema.plugin(autopopulate)

module.exports = mongoose.model('Recipe', recipeSchema)