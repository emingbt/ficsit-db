import { object, string } from "zod"

export const LoginFormSchema = object({
  email: string().email(),
  password: string().min(8),
})

export const SignupFormSchema = object({
  email: string().email(),
  name: string().min(3),
  password: string().min(8),
})

export const ForgotPasswordFormSchema = object({
  email: string().email(),
})

export const ResetPasswordFormSchema = object({
  password: string().min(8),
  confirmPassword: string().min(8),
})