'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { deleteFolder, deleteImageByUrl, moveCloudinaryFiles, updateCloudinaryImages } from "../../../services/cloudinary"
import { UpdateBlueprintFormSchema } from "../../../utils/zod"
import {
  deleteBlueprintById,
  getBlueprintById,
  getBlueprintPacksByBlueprintId,
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
      formData.get('uploadedImageUrl-0'),
      formData.get('uploadedImageUrl-1'),
      formData.get('uploadedImageUrl-2')
    ].filter((url): url is string => typeof url === 'string' && url.trim() !== ''),
    categories: formData.getAll('category'),
    videoUrl: formData.get('videoUrl'),
    visibility: formData.get('blueprintVisibility')
  })

  if (!validationResults.success) {
    return {
      error: validationResults.error.flatten().fieldErrors,
    }
  }

  const {
    id,
    description,
    images,
    categories,
    videoUrl,
    visibility
  } = validationResults.data

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

    const existingImages = blueprint.images
    const newImages = images.filter((url) => !existingImages.includes(url))
    const imagesToDelete = existingImages.filter((url) => !images.includes(url))

    // Move new images and get their final URLs
    const newImageUrls = await moveCloudinaryFiles({
      urls: newImages,
      pioneerName: pioneer.name,
      title: blueprint.title,
      resourceType: 'image'
    })

    // Delete removed images by URL
    for (const url of imagesToDelete) {
      try {
        await deleteImageByUrl(url, 'image')
      } catch (err) {
        console.error('Failed to delete image:', url, err)
      }
    }

    // Build the final images array, preserving order
    const imageUrlMap: Map<string, string> = new Map()
    newImages.forEach((url, idx) => {
      imageUrlMap.set(url, newImageUrls[idx])
    })
    const finalImageUrls = images.map((url) => imageUrlMap.get(url) || url)

    const updatedProperties = {
      description: description || null,
      images: finalImageUrls,
      categories,
      videoUrl: videoUrl || null,
      visibility
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
    revalidatePath(`/pioneers/${pioneer.name}`)
    revalidatePath('/settings')
    revalidatePath('/search')

    // Revalidate the blueprint packs that contain this blueprint
    const associatedBlueprintPacks = await getBlueprintPacksByBlueprintId(blueprint.id)
    associatedBlueprintPacks.forEach((pack) => {
      revalidatePath(`/blueprint-packs/${pack.id}`)
    })

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

  // 3. Check if the blueprint has any associated blueprint packs
  const associatedBlueprintPacks = await getBlueprintPacksByBlueprintId(blueprintId)
  if (associatedBlueprintPacks.length > 0) {
    return {
      error: 'This blueprint is associated with one or more blueprint packs. Please remove it from the packs before deleting.'
    }
  }

  // 4. Delete the blueprint
  try {
    // 4.1 Delete the blueprint files and images from Cloudinary
    await deleteFolder(pioneer.name, blueprint.title)

    // 4.2 Delete the blueprint from the database
    await deleteBlueprintById(blueprintId)

    revalidatePath('/blueprints')
    revalidatePath(`/blueprints/${blueprintId}`)
    revalidatePath('/pioneers')
    revalidatePath(`/pioneers/${pioneer.name}`)
    revalidatePath('/settings')
    revalidatePath('/search')

  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to delete the blueprint. Try again later.'
    }
  } finally {
    redirect('/settings')
  }
}