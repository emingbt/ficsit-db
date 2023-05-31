import { initTRPC, inferAsyncReturnType, TRPCError } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { verifyToken } from './auth'

// Create context and type it
export const createContext = async ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res
})
type Context = inferAsyncReturnType<typeof createContext>

// Initialize TRPC
const t = initTRPC.context<Context>().create()

// Create auth middleware
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.req.headers.authorization) {
    throw new TRPCError({ code: 'FORBIDDEN' })
  }
  else if (!verifyToken(ctx.req.headers.authorization)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next()
})

// Export router and procedures
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)