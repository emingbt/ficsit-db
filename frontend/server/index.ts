import { initTRPC } from '@trpc/server'

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

export const appRouter = router({
  hello: publicProcedure.query(async () => {
    return 'Hello World Hadii'
  })
})

export type AppRouter = typeof appRouter