import jwt from 'jsonwebtoken'
import createErrors from 'http-errors'

// Token expiration times
const expirationTimes = {
  "ACCESS": '30d',
  "RESET_PASSWORD": '5m',
  "EMAIL_CONFIRMATION": '30m'
}

// Generate token
export const generateToken = (
  id: string,
  tokenType: "ACCESS" | "RESET_PASSWORD" | "EMAIL_CONFIRMATION" = "ACCESS"
) => {
  // Get secret from environment variables
  const secret = process.env[`JWT_${tokenType}_SECRET`]

  // If secret is not defined, throw error
  // I'm not sure giving this information is a good idea
  if (!secret) {
    throw new Error('JWT secret not defined')
  }

  // Create and return token
  return jwt.sign({ id }, secret!, {
    expiresIn: expirationTimes[tokenType]
  })
}

// Verify token
export const verifyToken = (
  token: string,
  tokenType: "ACCESS" | "RESET_PASSWORD" | "EMAIL_CONFIRMATION" = "ACCESS"
) => {
  // Get secret from environment variables
  const secret = process.env[`JWT_${tokenType}_SECRET`]

  // If secret is not defined, throw error
  if (!secret) {
    throw new Error('JWT secret not defined')
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secret!) as { id: string }

    // Return user id
    return decoded.id
  } catch (error) {
    throw new createErrors.Unauthorized('Invalid token')
  }
}