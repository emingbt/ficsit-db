'use server'

import { redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { CreatePioneerFormSchema } from "../../utils/zod"
import { updateKindeUserProperties } from "../../services/kinde"
import { createNewPioneer, getPioneerByEmail } from "../../services/pioneer"
import { getPioneerByName } from "../../services/pioneer"

export async function createPioneer(state, formData: FormData) {
  // 1. Validate the form data
  const validationResults = CreatePioneerFormSchema.safeParse({
    name: formData.get('name'),
    avatar: formData.get('avatar'),
    color: formData.get('color'),
  })

  if (!validationResults.success) {
    return {
      error: validationResults.error.flatten().fieldErrors,
    }
  }

  const { name, avatar, color } = validationResults.data

  //2. Check if the user is authenticated and get the user
  const { getUser, isAuthenticated, refreshTokens } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return {
      error: {
        submit: 'You must be logged in to create a pioneer.'
      }
    }
  }

  const user = await getUser()

  if (!user || !user.email) {
    return {
      error: {
        submit: 'You must be logged in to create a pioneer.'
      }
    }
  }

  // 3. Check if the user is already a pioneer
  const existingPioneer = await getPioneerByEmail(user.email)

  if (existingPioneer) {
    return {
      error: {
        submit: 'You are already a pioneer.'
      }
    }
  }

  // 4. Check if the pioneer name is already taken
  const pioneer = await getPioneerByName(name)

  if (pioneer) {
    return {
      error: {
        name: ['This name is already taken.']
      }
    }
  }

  // 5. Create a new pioneer
  try {
    const pioneer = await createNewPioneer({
      email: user.email,
      kindeId: user.id,
    }, {
      name,
      avatar,
      color
    })

    if (!pioneer) {
      return {
        error: {
          submit: 'An error occurred while creating your pioneer.'
        }
      }
    }

    await updateKindeUserProperties(user.id, {
      name,
      avatar,
      color,
    })

    await refreshTokens()
  } catch (error) {
    console.error('Error creating pioneer:', error)
    return {
      error: {
        submit: 'An error occurred while creating your pioneer.'
      }
    }
  }

  // 6. Return success
  return {
    success: {
      submit: 'Your pioneer has been created successfully.'
    }
  }
}