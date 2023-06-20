import { router } from "../utils/trpc"
import { blueprintRouter } from "./blueprint"
import { upvoteRouter } from "./upvote"
import { userRouter } from "./user"

export const appRouter = router({
  blueprint: blueprintRouter,
  upvote: upvoteRouter,
  user: userRouter
})
