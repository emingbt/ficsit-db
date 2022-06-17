class Item { 
  constructor(name, description, image, details, recipes, usagesAsIngredient, usagesForBuildings) {
    this.name = name
    this.description = description
    this.image = image
    this.details = details
  }
}

class Building {
  constructor(name, description, image, type, cost, details, recipes, extractableResources, fuel) {
    this.name = name
    this.description = description
    this.image = image
    this.type = type
    this.cost = cost
  }
}

class Recipe {
  constructor(name, alternate, ingredients, products, machine) {
    this.name = name
    this.alternate = alternate
    this.ingredients = ingredients
    this.products = products
    this.machine = machine
  }
}