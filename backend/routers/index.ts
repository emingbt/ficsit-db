import { router } from "../utils/trpc"
import { blueprintRouter } from "./blueprint"
import { commentRouter } from "./comment"
import { upvoteRouter } from "./upvote"
import { userRouter } from "./user"

export const appRouter = router({
  blueprint: blueprintRouter,
  comment: commentRouter,
  upvote: upvoteRouter,
  user: userRouter
})
