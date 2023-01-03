export interface Item {
  slug: string;
  name: string;
  description: string;
  stackSize: number;
  sinkPoints: number;
  isFluid: boolean;
  isFuel: boolean;
  isBiomass: boolean;
  isRadioactive: boolean;
  isEquipment: boolean;
  meta: {};
  event: string;
}

export type ItemMap = {
  [key: string]: Item;
};

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
  cost: {
    itemClass: string,
    quantity: number
  }[]
  ,
  meta: {
    size: {
      width: number,
      length: number,
      height: number
    },
    powerInfo?: {
      consumption: number,
      variableConsumption?: {
        cycleTime: number,
        minimum: number,
        maximum: number
      }
    },
    overclockInfo?: {
      exponent: number
    },
    generatorInfo?: {
      powerProduction: number,
      fuels: {
        fuel: {
          itemClass: string,
          rate: number
        },
        supplement?: {
          itemClass: string,
          rate: number
        },
        byproduct?: {
          itemClass: string,
          rate: number
        }
      }[]
    },
    extractorInfo?: {
      allowedResourceForms: string[],
      allowedResources: string[],
      resourceExtractSpeed: number,
      isDependsPurity: boolean
    }
  }
}

export type BuildingMap = {
  [key: string]: Building[];
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
  ingredients: {
    itemClass: string,
    quantity: number,
    name?: string,
    isFluid?: boolean
  }[],
  products: {
    itemClass: string,
    quantity: number,
    name?: string,
    isFluid?: boolean
  }[],
  producedIn: string,
  event: string
}

export type ProductionRecipeMap = {
  [key: string]: ProductionRecipe;
}

export interface BuildingRecipe {
  slug: string,
  name: string,
  ingredients: {
    itemClass: string,
    quantity: number
  }[],
  product: string,
  event: string
}

export type BuildingRecipeMap = {
  [key: string]: BuildingRecipe;
}