'use server'

import { LoginFormSchema } from "../../utils/zod"
import bcrypt from "bcrypt"
import db from "../../utils/postgres"
import { eq } from "drizzle-orm"
import { Pioneer } from "../../drizzle/schema"
import { createSession } from "../../utils/session"

export async function login(state, formData: FormData) {
  // 1. Validate form fields
  const validationResults = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validationResults.success) {
    return {
      error: validationResults.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validationResults.data

  // 2. Query the database for the pioneer with the given email
  const pioneer = await db.query.Pioneer.findFirst({
    where: eq(Pioneer.email, email),
  })

  // If pioneer is not found, return early
  if (!pioneer) {
    return {
      error: {
        email: "There is no pioneer associated with this email address.",
      }
    }
  }

  // 3. Compare the pioneer's password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(
    password,
    pioneer.password,
  )

  // If the password does not match, return early
  if (!passwordMatch) {
    return {
      error: {
        password: ["Incorrect password."],
      }
    }
  }

  // 4. If login successful, create a session for the pioneer and redirect
  await createSession(pioneer.id)
}