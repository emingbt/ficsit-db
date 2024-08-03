'use server'

import { CreatePioneerFormSchema } from "../../utils/zod"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import db from "../../utils/postgres"
import { Pioneer } from "../../drizzle/schema"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

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
  const { getUser, isAuthenticated } = getKindeServerSession()
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
  const existingPioneer = await db.query.Pioneer.findFirst({
    where: eq(Pioneer.email, user.email),
  })

  if (existingPioneer) {
    return {
      error: {
        submit: 'You are already a pioneer.'
      }
    }
  }

  // 4. Create a new pioneer
  try {
    const pioneer = await db
      .insert(Pioneer)
      .values({
        name,
        email: user.email,
        avatar,
        color,
      })
      .returning({ name: Pioneer.name, avatar: Pioneer.avatar, color: Pioneer.color })

    if (!pioneer) {
      return {
        error: {
          submit: 'An error occurred while creating your pioneer.'
        }
      }
    }

    // 5. Add the avatar and color to the cookie
    cookies().set('pioneer', JSON.stringify(pioneer), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
  } catch (error) {
    console.error('Error creating pioneer:', error)
    return {
      error: {
        submit: 'An error occurred while creating your pioneer.'
      }
    }
  }

  // 6. Redirect to the home page
  redirect('/')
}