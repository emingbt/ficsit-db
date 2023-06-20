import { prisma } from "../prisma"
import { TRPCError } from "@trpc/server"
import cloudinary from 'cloudinary'
import type { Context } from "../utils/trpc"

const getAllBlueprints = async () => {
  const allBlueprints = await prisma.blueprint.findMany()
  return allBlueprints
}

const getBlueprintById = async (input: {
  blueprintId: string
}) => {
  const blueprint = await prisma.blueprint.findUnique({
    where: {
      id: input.blueprintId
    }
  })

  return blueprint
}

const getBlueprintsByDesignerId = async (input: {
  designerId: string
}) => {
  // Get all blueprints by designer id
  const blueprints = await prisma.blueprint.findMany({
    where: {
      designerId: input.designerId
    }
  })

  return blueprints
}

const getBlueprintByTitle = async (input: {
  title: string
}) => {
  // Get blueprint by title
  const blueprint = await prisma.blueprint.findUnique({
    where: {
      title: input.title
    },

    // Remove id and designeriId and include designer username and upvotes count
    select: {
      title: true,
      description: true,
      categories: true,
      imageLinks: true,
      fileLinks: true,
      designer: {
        select: {
          username: true
        }
      },
      _count: {
        select: {
          upvotes: true
        }
      }
    }
  })

  return blueprint
}

const createBlueprint = async ({ input, ctx }: {
  input: {
    title: string,
    description: string,
    files: string[],
    images: string[],
    categories: string[],
  },
  ctx: Context
}) => {
  // Check if title is already taken
  const blueprintExists = await prisma.blueprint.findUnique({
    where: {
      title: input.title
    }
  })

  if (blueprintExists) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Blueprint with this title already exists'
    })
  }

  // Get user id from context
  const userId = ctx.userId

  // Transform title to capitalize first letter of each word
  function transformTitle(title: string) {
    return title.replace(/\b\w/g, match => match.toUpperCase())
  }
  const transformedTitle = transformTitle(input.title)

  // Create blueprint
  const createdBlueprint = await prisma.blueprint.create({
    data: {
      title: transformedTitle,
      description: input.description,
      categories: input.categories,
      designerId: userId
    }
  })

  // If blueprint is not created, throw error
  if (!createdBlueprint) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Blueprint could not be created"
    })
  }

  // Convert image and files from base64 to cloudinary links
  const cloudinaryImages = await Promise.all(input.images.map(async (image) => {
    try {
      const uploadedImage = await cloudinary.v2.uploader
        .upload(image, { folder: `blueprints/${createdBlueprint.id}`, resource_type: 'image' })

      return uploadedImage.secure_url
    } catch (err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Image could not be uploaded'
      })
    }
  }))

  const cloudinaryFiles = await Promise.all(input.files.map(async (file, i) => {
    try {
      // Upload file to cloudinary with public id as title
      const uploadedFile = await cloudinary.v2.uploader
        .upload(file, {
          folder: `blueprints/${createdBlueprint.id}`,
          resource_type: 'raw',
          format: i == 0 ? 'sbp' : 'sbpcfg',
          public_id: i == 0 ? createdBlueprint.title : `${createdBlueprint.title} Config`
        })

      return uploadedFile.secure_url
    } catch (err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'File could not be uploaded'
      })
    }
  }))

  // Update blueprint with cloudinary links
  const updatedBlueprint = await prisma.blueprint.update({
    where: {
      id: createdBlueprint.id
    },
    data: {
      imageLinks: cloudinaryImages,
      fileLinks: cloudinaryFiles
    }
  })

  // If blueprint is not updated, throw error
  if (!updatedBlueprint) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Blueprint could not be updated"
    })
  }

  return updatedBlueprint
}

const updateBlueprint = async (input: {
  id: string,
  title: string,
  description: string,
  fileLinks: string[],
  imageLinks: string[],
  categories: string[],
}) => {
  // Check if user is the designer of the blueprint and update blueprint
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

  // If blueprint does not exist, throw error
  if (!updatedBlueprint) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Blueprint not found" })
  }

  return updatedBlueprint
}

const deleteBlueprint = async (input: {
  blueprintId: string
}) => {
  const deletedBlueprint = await prisma.blueprint.delete({
    where: {
      id: input.blueprintId
    }
  })


  return deletedBlueprint
}

export {
  getAllBlueprints,
  getBlueprintById,
  getBlueprintByTitle,
  getBlueprintsByDesignerId,
  createBlueprint,
  updateBlueprint,
  deleteBlueprint
}