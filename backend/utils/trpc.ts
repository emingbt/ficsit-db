import { initTRPC, inferAsyncReturnType } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

// Create context and type it
export const createContext = async ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => ({
  token: ''
})
type Context = inferAsyncReturnType<typeof createContext>

// Initialize TRPC
const t = initTRPC.context<Context>().create()

// Create auth middleware
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.token) {
    throw new Error('Not authorized')
  }

  return next()
})

// Export router and procedures
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)