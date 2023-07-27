export interface Item {
  slug: string
  name: string
  description: string
  stackSize: number
  sinkPoints: number
  isFluid: boolean
  isFuel: boolean
  isBiomass: boolean
  isRadioactive: boolean
  isEquipment: boolean
  imgUrl: string
  event: string
}

export type ItemMap = {
  [key: string]: Item
}

export interface BuildingType {
  slug: string,
  name: string,
  description: string,
  categories: string[],
  buildMenuPriority: number,
  isPowered: boolean,
  isOverclockable: boolean,
  isProduction: boolean,
  isResourceExtractor: boolean,
  isGenerator: boolean,
  isVehicle: boolean,
  event: string,
  imgUrl: string,
  cost: {
    slug: string,
    amount: number,
    imgUrl: string
  }[],
  overclockExponent?: number,
  powerConsumption?: number,
  powerProduction?: number,
  isDependsPurity?: boolean,
  resourceExtractSpeed?: number,
  resources?: {
    slug: string,
    name: string,
    imgUrl: string
  }[],
  fuels?: {
    name: string,
    items: {
      slug: string,
      imgUrl: string,
      isFluid: boolean,
      type: string,
      rate: number
    }[]
  }[]
}

export type BuildingMap = {
  [key: string]: BuildingType[]
}

export interface ProductionRecipe {
  slug: string,
  name: string,
  craftTime: number,
  maunalCraftMultiplier: number,
  isAlternate: boolean,
  handCraftable: boolean,
  workshopCraftable: boolean,
  machineCraftable: boolean,
  ingredients: ProductionRecipeItem[],
  products: ProductionRecipeItem[],
  building: {
    slug: string,
    name: string,
    imgUrl: string,
    consumption: number,
    exponent: number
  },
  event: string
}

export type ProductionRecipeMap = {
  [key: string]: ProductionRecipe
}

export interface BuildingRecipe {
  slug: string,
  name: string,
  ingredients: {
    itemClass: string,
    amount: number
  }[],
  product: string,
  event: string
}

export type BuildingRecipeMap = {
  [key: string]: BuildingRecipe
}

export interface ProductionRecipeItem {
  slug: string,
  imgUrl: string,
  amount: number,
  name?: string,
  isFluid?: boolean
}

export interface Fuel {
  name: string,
  items: {
    slug: string,
    imgUrl: string,
    type: string,
    rate: number
  }[]
}