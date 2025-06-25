'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { deleteFolder, updateCloudinaryImages } from "../../../services/cloudinary"
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
    blueprints: formData.getAll('blueprints'),
    categories: formData.getAll('category'),
    videoUrl: formData.get('videoUrl')
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
    blueprints,
    categories,
    videoUrl
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

    const imageUrls = await updateCloudinaryImages(images, blueprintPack.images, pioneer.name, blueprintPack.title, 'blueprint-pack')

    const updatedProperties = {
      description: description || null,
      images: imageUrls,
      categories,
      videoUrl: videoUrl || null,
      pioneerName: pioneer.name
    }

    // 6. Update the blueprint
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
    revalidatePath('/settings')
    revalidatePath(`/pioneers/${pioneer.name}`)
    revalidatePath(`/blueprint-packs/${deletedBlueprintPack.id}`)
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