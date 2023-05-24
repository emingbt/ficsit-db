import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAllBlueprints = async () => {
  const allBlueprints = await prisma.blueprint.findMany()
  return allBlueprints
}

export const getBlueprintById = async (input:
  {
    blueprintId: number
  }) => {
  const blueprint = await prisma.blueprint.findUnique({
    where: {
      id: input.blueprintId
    }
  })

  return blueprint
}