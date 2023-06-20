import { protectedProcedure, router } from "../utils/trpc"
import z from 'zod'
import { upvoteBlueprint, removeUpvote } from "../services/upvote"

export const upvoteRouter = router({
  upvoteBlueprint: protectedProcedure
    .input(z.object({ blueprintTitle: z.string().nonempty() }))
    .mutation(async ({ input, ctx }) => {
      const upvote = await upvoteBlueprint({ input, ctx })
      return upvote
    }),
  removeUpvote: protectedProcedure
    .input(z.object({ blueprintTitle: z.string().nonempty() }))
    .mutation(async ({ input, ctx }) => {
      const removedUpvote = await removeUpvote({ input, ctx })
      return removedUpvote
    })
})