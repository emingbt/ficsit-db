import { PrismaClient } from "@prisma/client"
import cloudinary from 'cloudinary'

const prisma = new PrismaClient()

export const getAllBlueprints = async () => {
  const allBlueprints = await prisma.blueprint.findMany()
  return allBlueprints
}

export const getBlueprintById = async (input:
  {
    blueprintId: string
  }) => {
  const blueprint = await prisma.blueprint.findUnique({
    where: {
      id: input.blueprintId
    }
  })

  return blueprint
}

export const createBlueprint = async (input:
  {
    title: string,
    description: string,
    fileLinks: string[],
    imageLinks: string[],
    categories: string[],
    designerId: string
  }) => {
  const createdBlueprint = await prisma.blueprint.create({
    data: {
      title: input.title,
      description: input.description,
      fileLinks: input.fileLinks,
      imageLinks: input.imageLinks,
      categories: input.categories,
      designerId: input.designerId
    }
  })

  return createdBlueprint
}

export const updateBlueprint = async (input:
  {
    id: string,
    title: string,
    description: string,
    fileLinks: string[],
    imageLinks: string[],
    categories: string[],
  }) => {
  const updatedBlueprint = await prisma.blueprint.update({
    where: {
      id: input.id
    },
    data: {
      title: input.title,
      description: input.description,
      fileLinks: input.fileLinks,
      imageLinks: input.imageLinks,
      categories: input.categories,
    }
  })

  return updatedBlueprint
}

export const deleteBlueprint = async (input:
  {
    blueprintId: string
  }) => {
  const deletedBlueprint = await prisma.blueprint.delete({
    where: {
      id: input.blueprintId
    }
  })

  await cloudinary.v2.uploader.destroy(`blueprints/${input.blueprintId}`, (result) => {
    console.log(result)
  })

  return deletedBlueprint
}