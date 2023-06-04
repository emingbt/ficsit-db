import * as trpcExpress from '@trpc/server/adapters/express'
import { verifyToken } from './auth'

// Create context
export const createContext = async ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => {
  // Get user from header function
  async function getUserFromHeader() {
    // If no authorization header, return null
    if (!req.headers.authorization) {
      return null
    }

    // Verify token
    const user = await verifyToken(
      req.headers.authorization.split(' ')[1]
    )

    return user
  }

  // Get user
  const user = await getUserFromHeader()

  // Return context
  return {
    req,
    res,
    user
  }
}
