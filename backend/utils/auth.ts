import jwt from 'jsonwebtoken'
import { getUserById } from '../services/user'
import { TRPCError } from '@trpc/server'

// Token types enum
export enum TokenType {
  ACCESS = 'ACCESS',
  RESET_PASSWORD = 'RESET_PASSWORD',
  EMAIL_CONFIRMATION = 'EMAIL_CONFIRMATION'
}

// Token expiration times
const expirationTimes = {
  [TokenType.ACCESS]: '30d',
  [TokenType.RESET_PASSWORD]: '5m',
  [TokenType.EMAIL_CONFIRMATION]: '30m'
}

// Generate token
export const generateToken = (id: string, tokenType = TokenType.ACCESS) => {
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
export const verifyToken = async (token: string, tokenType = TokenType.ACCESS) => {
  try {
    const secret = process.env[`JWT_${tokenType}_SECRET`]
    const decoded = jwt.verify(token, secret!)
    const { id } = decoded as { id: string }

    if (!id) {
      return null
    }

    return id
  } catch (err) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid token' })
  }
}