'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { CreatePioneerFormSchema, SocialLinksSchema } from "../../utils/zod"
import { updateKindeUserProperties } from "../../services/kinde"
import { createNewPioneer, getPioneerByEmail, updatePioneerSocialLinks } from "../../services/pioneer"
import { getPioneerByName } from "../../services/pioneer"
import type { SocialLink } from "../../drizzle/schema"

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

  const allLinks = {
    youtube: formData.get('social-youtube') || undefined,
    twitch: formData.get('social-twitch') || undefined,
    kick: formData.get('social-kick') || undefined,
    discord: formData.get('social-discord') || undefined,
    reddit: formData.get('social-reddit') || undefined,
    github: formData.get('social-github') || undefined,
  }

  const validationLinkResults = SocialLinksSchema.safeParse(allLinks)

  if (!validationLinkResults.success) {
    return {
      error: validationLinkResults.error.flatten().fieldErrors,
    }
  }

  const socialLinks = Object.entries(validationLinkResults.data)
    .filter(([_, url]) => url)
    .map(([platform, url]) => ({ platform, url })) as {
      platform: SocialLink['platform'],
      url: SocialLink['url']
    }[]

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

    // 6. After creating the pioneer, create the social links
    await updatePioneerSocialLinks(name, socialLinks)
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