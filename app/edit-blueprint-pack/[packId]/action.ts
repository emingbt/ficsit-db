'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { deleteFolder, deleteImageByUrl, moveCloudinaryFiles } from "../../../services/cloudinary"
import { UpdateBlueprintPackFormSchema } from "../../../utils/zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getPropertiesFromAccessToken } from "../../../utils/kinde"
import { deleteBlueprintPackById, getBlueprintPackById, updateBlueprintPackBlueprints, updateBlueprintPackProperties } from "../../../services/blueprintPack"

export async function updateBlueprintPack(state, formData: FormData) {
  // 1. Validate form data
  const validationResults = UpdateBlueprintPackFormSchema.safeParse({
    id: formData.get('blueprintPackId'),
    description: formData.get('description'),
    images: [
      formData.get('uploadedImageUrl-0'),
      formData.get('uploadedImageUrl-1'),
      formData.get('uploadedImageUrl-2')
    ].filter(
      (url): url is string => typeof url === 'string' && url.trim() !== ''
    ),
    blueprints: formData.getAll('blueprints'),
    categories: formData.getAll('category'),
    videoUrl: formData.get('videoUrl')
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
    blueprints,
    categories,
    videoUrl
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

  // 3. Upload images and files to cloudinary, then update the blueprint pack
  try {
    const blueprintPack = await getBlueprintPackById(parseInt(id))

    if (!blueprintPack) {
      return {
        error: {
          submit: 'Blueprint pack not found.'
        }
      }
    }

    if (blueprintPack.pioneerName !== pioneer.name) {
      return {
        error: {
          submit: 'Not authorized to update this blueprint pack.'
        }
      }
    }

    const existingImages = blueprintPack.images
    const newImages = images.filter((url) => !existingImages.includes(url))
    const imagesToDelete = existingImages.filter((url) => !images.includes(url))

    // Move new images and get their final URLs
    const newImageUrls = await moveCloudinaryFiles({
      urls: newImages,
      pioneerName: pioneer.name,
      title: blueprintPack.title,
      type: 'blueprint-pack'
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
      pioneerName: pioneer.name
    }

    // 6. Update the blueprint pack
    const updatedBlueprintPack = await updateBlueprintPackProperties(blueprintPack.id, updatedProperties)

    if (!updatedBlueprintPack) {
      return {
        error: {
          submit: 'Failed to update the blueprint pack. Try again later.'
        }
      }
    }

    // Convert the blueprint IDs to numbers
    const blueprintIds = blueprints.map((id: string) => parseInt(id))

    // 7. Update the blueprints in the blueprint pack
    const updatedBlueprintIds = await updateBlueprintPackBlueprints(updatedBlueprintPack.id, blueprintIds)

    // 8. Revalidate the paths
    revalidatePath('/blueprint-packs')
    revalidatePath(`/blueprint-packs/${blueprintPack.id}`)
    revalidatePath(`/pioneers/${pioneer.name}`)
    revalidatePath('/settings')
    revalidatePath('/search')

    // Revalidate the blueprints in the pack
    updatedBlueprintIds.forEach((blueprintId) => {
      revalidatePath(`/blueprints/${blueprintId}`)
    })

    return {
      success: {
        data: updatedBlueprintPack.id,
        submit: 'Blueprint pack updated successfully.'
      }
    }
  } catch (error) {
    console.log(error)
    return {
      error: {
        submit: 'Failed to update the blueprint pack. Try again later.'
      }
    }
  }
}

export async function deleteBlueprintPack(blueprintPackId: number) {
  // 1. Check if the user is authenticated and get the pioneer name
  const { isAuthenticated, getAccessToken } = getKindeServerSession()
  const authenticated = await isAuthenticated()
  const accessToken = await getAccessToken()

  if (!authenticated || !accessToken) {
    return {
      error: 'You must be logged in to delete a blueprint pack.'
    }
  }

  const pioneer = getPropertiesFromAccessToken(accessToken)

  if (!pioneer) {
    return {
      error: 'You must be logged in to delete a blueprint pack.'
    }
  }

  // 2. Check if the pioneer is the owner of the blueprint pack
  const blueprintPack = await getBlueprintPackById(blueprintPackId)

  if (!blueprintPack) {
    return {
      error: 'Blueprint pack not found.'
    }
  }

  if (blueprintPack.pioneerName !== pioneer.name) {
    return {
      error: 'Not authorized to delete this blueprint pack.'
    }
  }

  // 3. Delete the blueprint pack
  try {
    // 3.1 Delete the images from Cloudinary
    await deleteFolder(pioneer.name, blueprintPack.title, 'blueprint-pack')

    // 3.2 Delete the blueprint from the database
    const deletedBlueprintPack = await deleteBlueprintPackById(blueprintPackId)

    revalidatePath('/blueprint-packs')
    revalidatePath(`/blueprint-packs/${deletedBlueprintPack.id}`)
    revalidatePath(`/pioneers/${pioneer.name}`)
    revalidatePath('/settings')
    revalidatePath('/search')

    deletedBlueprintPack.deletedBlueprintIds.forEach((blueprintId) => {
      revalidatePath(`/blueprints/${blueprintId}`)
    })
  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to delete the blueprint pack. Try again later.'
    }
  } finally {
    redirect('/settings')
  }
}