import { protectedProcedure, router } from "../utils/trpc"
import z from 'zod'
import { addComment, removeComment } from "../services/comment"

export const commentRouter = router({
  addComment: protectedProcedure
    .input(z.object({
      blueprintTitle: z.string().nonempty(),
      comment: z.string().nonempty()
    }))
    .mutation(async ({ input, ctx }) => {
      const comment = await addComment({ input, ctx })
      return comment
    }),
  removeComment: protectedProcedure
    .input(z.object({ commentId: z.string().nonempty() }))
    .mutation(async ({ input, ctx }) => {
      const removedComment = await removeComment({ input, ctx })
      return removedComment
    })
})