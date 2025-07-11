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

export interface Building {
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
  fuels?: Fuel[]
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

export interface ProductionRecipeItem {
  slug: string,
  imgUrl: string,
  amount: number,
  name: string,
  isFluid: boolean
}

export interface Fuel {
  name: string,
  items: {
    slug: string,
    imgUrl: string,
    isFluid: boolean,
    type: string,
    rate: number
  }[]
}

export interface SearchData {
  items: Item[],
  buildings: Building[],
  recipes: ProductionRecipe[]
}

export interface ItemData {
  item: Item,
  recipes: ProductionRecipe[],
  usagesAsIngredient: ProductionRecipe[]
}

export interface BuildingData {
  building: Building,
  recipes: ProductionRecipe[],
  fuels: Building['fuels']
}

export interface BlueprintCardProps {
  id: number,
  title: string,
  images: string[],
  averageRating: number,
  visibility?: 'public' | 'unlisted' | 'private',
}

export interface Pioneer {
  name: string,
  email: string,
  avatar: 'bacon-agaric' |
  'beryl-nut' |
  'ficsit-coffee-cup' |
  'lizard-doggo' |
  'paleberry' |
  'pioneer' |
  'small-stinger' |
  'space-giraffe-tick-penguin-whale',
  color: 'gray' |
  'purple' |
  'indigo' |
  'blue' |
  'green' |
  'yellow' |
  'orange' |
  'red',
  createdAt: Date
}

export interface BlueprintPackCardProps {
  id: number
  title: string,
  images: string[],
  averageRating: number,
  blueprintCount: number,
}