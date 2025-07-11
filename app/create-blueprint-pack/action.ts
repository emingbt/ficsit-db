'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { moveCloudinaryFiles } from "../../services/cloudinary"
import { CreateBlueprintPackFormSchema } from "../../utils/zod"
import { getPioneerByEmail } from "../../services/pioneer"
import { redirect } from "next/navigation"
import { checkIfTitleIsUsed, createNewBlueprintPack } from "../../services/blueprintPack"
import { revalidatePath } from "next/cache"
import { getAllBlueprintsByPioneer } from "../../services/blueprint"

export default async function createBlueprintPack(state, formData: FormData) {
  // 1. Validate form data
  const validationResults = CreateBlueprintPackFormSchema.safeParse({
    title: formData.get('title'),
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
    title,
    description,
    images,
    blueprints,
    categories,
    videoUrl
  } = validationResults.data

  // 2. Check if the user is authenticated and get the pioneer name
  const { isAuthenticated, getUser } = getKindeServerSession()

  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return {
      error: {
        submit: 'You must be logged in to create a blueprint pack.'
      }
    }
  }

  const user = await getUser()

  if (!user || !user.email) {
    return {
      error: {
        submit: 'User not found.'
      }
    }
  }

  // 3. Check if the user has a pioneer
  const pioneer = await getPioneerByEmail(user.email)

  if (!pioneer || !pioneer.name) {
    redirect('/create-pioneer')
  }

  // 4. Check if the blueprint title is not being used
  const isTitleUsed = await checkIfTitleIsUsed(title)

  if (isTitleUsed) {
    return {
      error: {
        submit: 'There is already a blueprint pack with this title.'
      }
    }
  }

  // 5. Upload files to cloudinary, arrange images, then create the blueprint
  try {
    const imageUrls = await moveCloudinaryFiles({
      urls: images,
      pioneerName: pioneer.name,
      title,
      type: 'blueprint-pack'
    })

    const blueprintPack = {
      title,
      description: description || null,
      images: imageUrls,
      categories,
      videoUrl: videoUrl || null,
      pioneerName: pioneer.name
    }

    // 6. Check if the blueprint are existing and pioneer is the owner
    // Transform blueprint IDs from string to number
    const blueprintIds = blueprints.map(bp => {
      const id = Number(bp)
      if (isNaN(id)) {
        throw new Error('Invalid blueprint ID.')
      }
      return id
    })

    const allBlueprintsOfPioneer = await getAllBlueprintsByPioneer(pioneer.name)
    const existingBlueprints = allBlueprintsOfPioneer.filter(bp => blueprintIds.includes(bp.id))

    if (existingBlueprints.length !== blueprintIds.length) {
      return {
        error: {
          submit: 'Some blueprints do not exist or you are not the owner.'
        }
      }
    }

    // 7. Create the blueprint
    const newBlueprintPack = await createNewBlueprintPack(blueprintPack, blueprintIds)

    if (!newBlueprintPack) {
      return {
        error: {
          submit: 'Failed to create the blueprint. Try again later.'
        }
      }
    }

    revalidatePath('/blueprint-packs')
    revalidatePath(`/blueprint-packs/${newBlueprintPack.id}`)
    revalidatePath(`/pioneers/${pioneer.name}`)
    revalidatePath('/settings')
    revalidatePath('/search')

    // Revalidate the blueprints in the pack
    newBlueprintPack.blueprints.forEach((blueprint) => {
      revalidatePath(`/blueprints/${blueprint.id}`)
    })

    return {
      success: {
        data: newBlueprintPack.id,
        submit: 'Blueprint created successfully.'
      }
    }
  } catch (error) {
    console.log(error)
    return {
      error: {
        submit: 'Failed to create the blueprint. Try again later.'
      }
    }
  }
}