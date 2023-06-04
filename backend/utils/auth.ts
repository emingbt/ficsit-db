import jwt from 'jsonwebtoken'
import { getUserById } from '../services/user'
import { TRPCError } from '@trpc/server'

// Token types enum
export enum TokenType {
  access = 'ACCESS',
  resetPassword = 'RESET_PASSWORD',
  emailConfirmation = 'EMAIL_CONFIRMATION'
}

// Token expiration times
const expirationTimes = {
  [TokenType.access]: '30d',
  [TokenType.resetPassword]: '30m',
  [TokenType.emailConfirmation]: '30m'
}

// Generate token
export const generateToken = (id: string, tokenType = TokenType.access) => {
  // Get secret from environment variables
  const secret = process.env[`JWT_${tokenType}_SECRET`]

  // If secret is not defined, throw error
  if (!secret) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'JWT secret is not defined'
    })
  }

  // Create and return token
  return jwt.sign({ id }, secret!, {
    expiresIn: expirationTimes[tokenType]
  })
}

// Verify token
export const verifyToken = async (token: string, tokenType = TokenType.access) => {
  try {
    const secret = process.env[`JWT_${tokenType}_SECRET`]
    const decoded = jwt.verify(token, secret!)
    const { id } = decoded as { id: string }

    if (!id) {
      return false
    }

    const user = await getUserById({ id })

    if (!user) {
      return false
    }

    return user
  } catch (err) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid token' })
  }
}