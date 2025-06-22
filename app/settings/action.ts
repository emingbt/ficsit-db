'use server'

import { revalidatePath } from "next/cache"
import { UpdateAvatarFormSchema, SocialLinksSchema } from "../../utils/zod"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPioneerByEmail, updatePioneerAvatar, updatePioneerSocialLinks } from "../../services/pioneer"
import { updateKindeUserProperties } from "../../services/kinde"
import { getAllBlueprintsByPioneer } from "../../services/blueprint"
import type { SocialLink } from "../../drizzle/schema"

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

  // 4. Update the avatar
  try {
    await updatePioneerAvatar(user.email, avatar, color)

    await updateKindeUserProperties(user.id, {
      avatar,
      color
    })

    await refreshTokens()

    revalidatePath("/pioneers")
    revalidatePath(`/pioneers/${pioneer.name}`)
    revalidatePath(`/search`)

    // Get the blueprints of the pioneer and revalidate their paths
    const blueprints = await getAllBlueprintsByPioneer(pioneer.name)
    blueprints.forEach((blueprint) => {
      revalidatePath(`/blueprints/${blueprint.id}`)
    })

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

export async function updateSocialLinks(state, formData: FormData) {
  // 1. Validate the form data
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

  // 2. Check if the user is authenticated and get the user
  const { getUser, isAuthenticated } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return {
      error: {
        submit: 'You must be logged in to update your social links.'
      }
    }
  }

  const user = await getUser()

  if (!user || !user.email) {
    return {
      error: {
        submit: 'You must be logged in to update your social links.'
      }
    }
  }

  // 3. Get the pioneer
  const pioneer = await getPioneerByEmail(user.email)

  if (!pioneer) {
    return {
      error: {
        submit: 'You must be a pioneer to update your social links.'
      }
    }
  }

  try {
    // 4. Update the social links
    await updatePioneerSocialLinks(pioneer.name, socialLinks)

    revalidatePath(`/pioneers/${pioneer.name}`)

    return {
      success: {
        submit: 'Your social links have been updated successfully.'
      }
    }
  } catch (error) {
    console.log(error)
    return {
      error: {
        submit: 'An error occurred while updating your social links. Please try again later.'
      }
    }
  }
}