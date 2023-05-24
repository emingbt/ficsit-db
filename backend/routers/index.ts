import { router } from "../utils/trpc"
import { helloRouter } from "./hello"
import { userRouter } from "./user"

export const appRouter = router({
  hello: helloRouter,
  user: userRouter
})
