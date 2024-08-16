'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { uploadFilesToCloudinary, uploadImagesToCloudinary } from "../../services/cloudinary"
import { CrateBlueprintFormSchema } from "../../utils/zod"
import { getPioneerByEmail } from "../../services/auth"
import { redirect } from "next/navigation"
import { createNewBlueprint, getAllBlueprintsByPioneer } from "../../services/blueprint"

export default async function createBlueprint(state, formData: FormData) {
  // 1. Validate form data
  const validationResults = CrateBlueprintFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    images: formData.getAll('images'),
    files: formData.getAll('files'),
    categories: formData.getAll('category')
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
    files,
    categories
  } = validationResults.data

  // 2. Check if the user is authenticated and get the pioneer name
  const { isAuthenticated, getUser } = getKindeServerSession()

  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return {
      error: {
        submit: 'You must be logged in to create a blueprint.'
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

  // 4. Check if the user has another blueprint with the same title
  const blueprints = await getAllBlueprintsByPioneer(pioneer.name)

  if (blueprints.some((blueprint) => blueprint.title === title)) {
    return {
      error: {
        submit: 'You have already created a blueprint with this title.'
      }
    }
  }

  // 5. Upload images and files to cloudinary, then create the blueprint
  try {
    const imageUrls = await uploadImagesToCloudinary(images, pioneer.name, title)
    const fileUrls = await uploadFilesToCloudinary(files, pioneer.name, title)

    const blueprint = {
      title,
      description,
      images: imageUrls,
      files: fileUrls,
      categories,
      pioneerName: pioneer.name
    }

    // 6. Create the blueprint
    const newBlueprint = await createNewBlueprint(blueprint)

    if (!newBlueprint) {
      return {
        error: {
          submit: 'Failed to create the blueprint. Try again later.'
        }
      }
    }

    return {
      success: {
        data: newBlueprint.title,
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