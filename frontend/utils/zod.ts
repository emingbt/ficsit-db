import { object, string } from "zod"

export const LoginFormSchema = object({
  email: string().email(),
  password: string().min(8),
})

export const SignupFormSchema = object({
  name: string()
    .min(3, { message: 'Name must be at least 3 characters long.' })
    .max(64, { message: 'Name must be at most 64 characters long.' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Name must contain only letters, numbers, and underscores.',
    })
    .trim(),
  email: string().email({ message: 'Please enter a valid email.' }).trim(),
  password: string()
    .min(8, { message: 'Be at least 8 characters long' })
    .max(64, { message: 'Be at most 64 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export const ForgotPasswordFormSchema = object({
  email: string().email(),
})

export const ResetPasswordFormSchema = object({
  password: string().min(8),
  confirmPassword: string().min(8),
})