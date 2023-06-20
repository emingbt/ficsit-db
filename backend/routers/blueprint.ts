import { protectedProcedure, publicProcedure, router } from "../utils/trpc"
import z from 'zod'
import {
  getAllBlueprints,
  getBlueprintByTitle,
  createBlueprint,
  updateBlueprint,
  deleteBlueprint
} from "../services/blueprint"

export const blueprintRouter = router({
  getAllBlueprints: publicProcedure
    .query(async () => {
      const allBlueprints = await getAllBlueprints()
      return allBlueprints
    }),
  getBlueprintByTitle: publicProcedure
    .input(z.object({ title: z.string().nonempty() }))
    .query(async ({ input }) => {
      const blueprint = await getBlueprintByTitle(input)
      return blueprint
    }),
  createBlueprint: protectedProcedure
    .input(z.object({
      title: z.string().nonempty(),
      description: z.string(),
      files: z.array(z.string()).min(2),
      images: z.array(z.string()).min(1),
      categories: z.array(z.string()).min(1)
    }))
    .mutation(async ({ input, ctx }) => {
      const createdBlueprint = await createBlueprint({ input, ctx })
      return createdBlueprint
    }),
  updateBlueprint: protectedProcedure
    .input(z.object({
      oldTitle: z.string().nonempty(),
      title: z.string().nonempty(),
      description: z.string(),
      fileLinks: z.array(z.string()).length(2),
      imageLinks: z.array(z.string()).min(1),
      categories: z.array(z.string()).min(1)
    }))
    .mutation(async ({ input }) => {
      const updatedBlueprint = await updateBlueprint(input)
      return updatedBlueprint
    }),
  deleteBlueprint: protectedProcedure
    .input(z.object({ blueprintId: z.string() }))
    .mutation(async ({ input }) => {
      const deletedBlueprint = await deleteBlueprint(input)
      return deletedBlueprint
    })
})