'use server'

import { UpdateAvatarFormSchema } from "../../utils/zod"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPioneerByEmail } from "../../services/auth"
import db from "../../utils/postgres"
import { Pioneer } from "../../drizzle/schema"
import { eq } from "drizzle-orm"

export async function updateAvatar(state, formData: FormData) {
  // 1. Validate the form data
  const validationResults = UpdateAvatarFormSchema.safeParse({
    avatar: formData.get('avatar'),
    color: formData.get('color'),
  })

  if (!validationResults.success) {
    return {
      error: validationResults.error.flatten().fieldErrors,
    }
  }

  const { avatar, color } = validationResults.data

  //2. Check if the user is authenticated and get the user
  const { getUser, isAuthenticated, refreshTokens } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return {
      error: {
        submit: 'You must be logged in to update your avatar.'
      }
    }
  }

  const user = await getUser()

  if (!user || !user.email) {
    return {
      error: {
        submit: 'You must be logged in to update your avatar.'
      }
    }
  }

  // 3. Get the pioneer
  const pioneer = await getPioneerByEmail(user.email)

  if (!pioneer) {
    return {
      error: {
        submit: 'You must be a pioneer to update your avatar.'
      }
    }
  }

  // 4. Update the pioneer
  try {
    await db
      .update(Pioneer)
      .set({
        avatar,
        color,
      })
      .where(eq(Pioneer.email, user.email))
      .execute()

    await refreshTokens()

    return {
      success: {
        submit: 'Your avatar has been updated successfully.'
      }
    }
  } catch (error) {
    console.log(error)
    return {
      error: {
        submit: 'An error occurred while updating your avatar. Please try again later.'
      }
    }
  }
}