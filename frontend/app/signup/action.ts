'use server'

import { SignupFormSchema } from "../../utils/zod"
import bcrypt from "bcrypt"
import db from "../../utils/postgres"
import { eq } from "drizzle-orm"
import { Pioneer } from "../../drizzle/schema"
import { createSession } from "../../utils/session"

export async function signup(state, formData: FormData) {
  // 1. Validate the form data
  const validationResults = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validationResults.success) {
    return {
      error: validationResults.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validationResults.data

  // 2. Check if the user already exists
  const existingUserWithEmail = await db.query.Pioneer.findFirst({
    where: eq(Pioneer.email, email),
  })

  if (existingUserWithEmail) {
    return {
      error: {
        email: 'Email already exists, please use a different email or login.'
      },
    }
  }

  const existingUserWithName = await db.query.Pioneer.findFirst({
    where: eq(Pioneer.name, name),
  })

  if (existingUserWithName) {
    return {
      error: {
        name: ['This name is already taken, please use a different name.']
      },
    }
  }

  // 3. Create a new user
  const hashedPassword = await bcrypt.hash(password, 10)

  const data = await db
    .insert(Pioneer)
    .values({ name, email, password: hashedPassword })
    .returning({ id: Pioneer.id })

  const user = data[0]

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }

  // 4. Create a new session
  await createSession(user.id)
}