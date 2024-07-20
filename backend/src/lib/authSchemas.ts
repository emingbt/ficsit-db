import { z } from 'zod'

export const signUpSchema = z.object({
  // 3-16 characters, alphanumeric and underscores only, first three characters must be letters
  name: z.string().min(3).max(16).regex(/^[a-zA-Z]{3}[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(8).max(16).regex(/^[a-zA-Z0-9_]+$/)
})