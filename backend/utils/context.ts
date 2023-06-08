import * as trpcExpress from '@trpc/server/adapters/express'

// Create context
export const createContext = async ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => {
  // Get token from header function
  function getTokenFromHeader() {
    // If no authorization header, return null
    if (!req.headers.authorization) {
      return ''
    }

    return req.headers.authorization?.split(' ')[1] || ''
  }

  // Get token from header
  const token = getTokenFromHeader()

  // Return context
  return {
    req,
    res,
    token,
    userId: ''
  }
}
