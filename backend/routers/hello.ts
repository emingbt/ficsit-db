import { publicProcedure, router } from "../utils/trpc"

export const helloRouter = router({
  getHello: publicProcedure.query(() => {
    return 'Hello World!'
  }),
})