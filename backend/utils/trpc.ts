import { initTRPC, inferAsyncReturnType, TRPCError } from '@trpc/server'
import { createContext } from './context'
import { verifyToken } from './auth'

// Create context type
export type Context = inferAsyncReturnType<typeof createContext>

// Initialize TRPC
const t = initTRPC.context<Context>().create()

// Create middleware to check if user is authorized
const isAuthed = t.middleware(async ({ ctx, next }) => {
  // Get token from the context
  const token = ctx.token

  // Verify token
  const userId = await verifyToken(token)

  // If token is invalid, throw error
  if (!userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User is not authorized'
    })
  }

  // Continue to next and add user id to context
  return next({
    ctx: {
      userId: userId
    }
  })
})

// Export router and procedures
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)