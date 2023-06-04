import { initTRPC, inferAsyncReturnType, TRPCError } from '@trpc/server'
import { createContext } from './context'

// Create context type
export type Context = inferAsyncReturnType<typeof createContext>

// Initialize TRPC
const t = initTRPC.context<Context>().create()

const isAuthed = t.middleware(async ({ ctx, next }) => {
  // If user is not authorized, throw error
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User is not authorized'
    })
  }

  // Continue
  return next({
    ctx: {
      user: ctx.user
    }
  })
})

// Export router and procedures
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)