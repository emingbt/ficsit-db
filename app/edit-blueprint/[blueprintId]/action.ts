'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { deleteFolder, updateCloudinaryImages } from "../../../services/cloudinary"
import { UpdateBlueprintFormSchema } from "../../../utils/zod"
import {
  deleteBlueprintById,
  getBlueprintById,
  updateBlueprintProperties
} from "../../../services/blueprint"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getPropertiesFromAccessToken } from "../../../utils/kinde"

export async function updateBlueprint(state, formData: FormData) {
  // 1. Validate form data
  const validationResults = UpdateBlueprintFormSchema.safeParse({
    id: formData.get('blueprintId'),
    description: formData.get('description'),
    images: [
      formData.get('image-0'),
      formData.get('image-1'),
      formData.get('image-2')
    ].reduce((acc: any[], image) => {
      if (image === null) {
        acc.push("skip")
      } else if (image instanceof File && image.size > 0) {
        acc.push(image)
      } else {
        acc.push("delete")
      }
      return acc
    }, []),
    categories: formData.getAll('category')
  })

  if (!validationResults.success) {
    console.log(validationResults.error.flatten().fieldErrors)
    return {
      error: validationResults.error.flatten().fieldErrors,
    }
  }

  const {
    id,
    description,
    images,
    categories
  } = validationResults.data

  // Check the sizes of the images
  const imageSizeError = images.some((image: File) => image.size > 1000000)
  if (imageSizeError) {
    return {
      error: {
        images: 'Each image must be less than 1MB.'
      }
    }
  }

  // 2. Check if the user is authenticated and get the pioneer name
  const { isAuthenticated, getAccessToken } = getKindeServerSession()
  const authenticated = await isAuthenticated()
  const accessToken = await getAccessToken()

  if (!authenticated || !accessToken) {
    return {
      error: {
        submit: 'You must be logged in to update a blueprint.'
      }
    }
  }

  const pioneer = getPropertiesFromAccessToken(accessToken)

  if (!pioneer) {
    return {
      error: {
        submit: 'You must be logged in to update a blueprint.'
      }
    }
  }

  // 3. Upload images and files to cloudinary, then update the blueprint
  try {
    const blueprint = await getBlueprintById(parseInt(id))

    if (!blueprint) {
      return {
        error: {
          submit: 'Blueprint not found.'
        }
      }
    }

    if (blueprint.pioneerName !== pioneer.name) {
      return {
        error: {
          submit: 'Not authorized to update this blueprint.'
        }
      }
    }

    const imageUrls = await updateCloudinaryImages(images, blueprint.images, pioneer.name, blueprint.title)

    const updatedProperties = {
      description,
      images: imageUrls,
      categories,
      pioneerName: pioneer.name
    }

    // 6. Update the blueprint
    const updatedBlueprint = await updateBlueprintProperties(blueprint.id, updatedProperties)

    if (!updatedBlueprint) {
      return {
        error: {
          submit: 'Failed to update the blueprint. Try again later.'
        }
      }
    }

    revalidatePath('/blueprints')
    revalidatePath(`/blueprints/${blueprint.id}`)

    return {
      success: {
        data: updatedBlueprint.id,
        submit: 'Blueprint updated successfully.'
      }
    }
  } catch (error) {
    console.log(error)
    return {
      error: {
        submit: 'Failed to update the blueprint. Try again later.'
      }
    }
  }
}

export async function deleteBlueprint(blueprintId: number) {
  // 1. Check if the user is authenticated and get the pioneer name
  const { isAuthenticated, getAccessToken } = getKindeServerSession()
  const authenticated = await isAuthenticated()
  const accessToken = await getAccessToken()

  if (!authenticated || !accessToken) {
    return {
      error: 'You must be logged in to delete a blueprint.'
    }
  }

  const pioneer = getPropertiesFromAccessToken(accessToken)

  if (!pioneer) {
    return {
      error: 'You must be logged in to delete a blueprint.'
    }
  }

  // 2. Check if the pioneer is the owner of the blueprint
  const blueprint = await getBlueprintById(blueprintId)

  if (!blueprint) {
    return {
      error: 'Blueprint not found.'
    }
  }

  if (blueprint.pioneerName !== pioneer.name) {
    return {
      error: 'Not authorized to delete this blueprint.'
    }
  }

  // 3. Delete the blueprint
  try {
    // 3.1 Delete the blueprint files and images from Cloudinary
    await deleteFolder(pioneer.name, blueprint.title)

    // 3.2 Delete the blueprint from the database
    await deleteBlueprintById(blueprintId)

    revalidatePath('/blueprints')
    revalidatePath('/profile')
    revalidatePath(`/pioneers/${pioneer.name}`)

  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to delete the blueprint. Try again later.'
    }
  } finally {
    redirect('/profile')
  }
}