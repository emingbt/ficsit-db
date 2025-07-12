'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { moveCloudinaryFiles, uploadFilesToCloudinary } from "../../services/cloudinary"
import { CreateBlueprintFormSchema } from "../../utils/zod"
import { getPioneerByEmail } from "../../services/pioneer"
import { redirect } from "next/navigation"
import { checkIfTitleIsUsed, createNewBlueprint } from "../../services/blueprint"
import { revalidatePath } from "next/cache"

export default async function createBlueprint(state, formData: FormData) {
  // 1. Validate form data
  const validationResults = CreateBlueprintFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    images: [
      formData.get('uploadedImageUrl-0'),
      formData.get('uploadedImageUrl-1'),
      formData.get('uploadedImageUrl-2')
    ].filter(
      (url): url is string => typeof url === 'string' && url.trim() !== ''
    ),
    files: formData.getAll('files').filter(
      (file): file is File => file instanceof File && file.size > 0
    ),
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
    title,
    description,
    images,
    files,
    categories,
    videoUrl,
    visibility
  } = validationResults.data

  // Check the sizes and extensions of the images and files
  const fileSizeError = files.some((file: File) => file.size > 1000000)
  const fileExtensionError = files.some((file: File, idx: number) => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    const mime = file.type
    if (idx === 0 && (ext !== "sbp" || mime !== "application/octet-stream")) return true
    if (idx === 1 && (ext !== "sbpcfg" || mime !== "application/octet-stream")) return true
    return false
  })

  if (fileSizeError) {
    return {
      error: {
        files: 'Each file must be less than 1MB.'
      }
    }
  }

  if (fileExtensionError) {
    return {
      error: {
        files: 'Please upload a .sbp file for the first input and a .sbpcfg file for the second input.'
      }
    }
  }

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

  // 4. Check if the blueprint title is not being used
  const isTitleUsed = await checkIfTitleIsUsed(title)

  if (isTitleUsed) {
    return {
      error: {
        submit: 'There is already a blueprint with this title.'
      }
    }
  }

  // 5. Upload files to cloudinary, arrange the images, then create the blueprint
  try {
    const fileUrls = await uploadFilesToCloudinary(files, pioneer.name, title)

    const imageUrls = await moveCloudinaryFiles({
      urls: images,
      pioneerName: pioneer.name,
      title,
      resourceType: 'image'
    })

    const blueprint = {
      title,
      description: description || null,
      images: imageUrls,
      files: fileUrls,
      categories,
      videoUrl: videoUrl || null,
      fileSize: files[0].size,
      pioneerName: pioneer.name,
      visibility
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

    revalidatePath('/blueprints')
    revalidatePath(`/pioneers/${pioneer.name}`)
    revalidatePath('/settings')
    revalidatePath('/pioneers')
    revalidatePath('/search')

    return {
      success: {
        data: newBlueprint.id,
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