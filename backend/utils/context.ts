import * as trpcExpress from '@trpc/server/adapters/express'
import { verifyToken } from './auth'

// Create context
export const createContext = async ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => {
  // Get userId from header function
  async function getUserIdFromHeader() {
    // If no authorization header, return null
    if (!req.headers.authorization) {
      return null
    }

    // Verify token
    const userId = await verifyToken(
      req.headers.authorization.split(' ')[1]
    )

    return userId
  }

  // Get userId
  const userId = await getUserIdFromHeader()

  // Return context
  return {
    req,
    res,
    userId
  }
}
