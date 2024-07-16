import { object, string } from "zod"

export const loginSchema = object({
  email: string().email(),
  password: string().min(8),
})

export const signupSchema = object({
  email: string().email(),
  username: string().min(3),
  password: string().min(8),
})

export const forgotPasswordSchema = object({
  email: string().email(),
})
})