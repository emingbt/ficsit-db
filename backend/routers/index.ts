import { router } from "../utils/trpc"
import { blueprintRouter } from "./blueprint"
import { userRouter } from "./user"

export const appRouter = router({
  blueprint: blueprintRouter,
  user: userRouter
})
