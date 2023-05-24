import { publicProcedure, router } from "../utils/trpc"
import z from 'zod'
import {
  getAllBlueprints,
  getBlueprintById,
  createBlueprint,
  updateBlueprint,
  deleteBlueprint
} from "../services/blueprint"

export const blueprintRouter = router({
  getAllBlueprints: publicProcedure.query(async () => {
    const allBlueprints = await getAllBlueprints()
    return allBlueprints
  }),
  getBlueprintById: publicProcedure
    .input(z.object({ blueprintId: z.number() }))
    .query(async ({ input }) => {
      const blueprint = await getBlueprintById(input)
      return blueprint
    }),
  createBlueprint: publicProcedure
    .input(z.object({
      title: z.string(),
      description: z.string(),
      fileLinks: z.array(z.string()),
      imageLinks: z.array(z.string()),
      categories: z.array(z.string()),
      designerId: z.number()
    }))
    .mutation(async ({ input }) => {
      const createdBlueprint = await createBlueprint(input)
      return createdBlueprint
    }),
  updateBlueprint: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      fileLinks: z.array(z.string()),
      imageLinks: z.array(z.string()),
      categories: z.array(z.string()),
    }))
    .mutation(async ({ input }) => {
      const updatedBlueprint = await updateBlueprint(input)
      return updatedBlueprint
    }),
  deleteBlueprint: publicProcedure
    .input(z.object({ blueprintId: z.number() }))
    .mutation(async ({ input }) => {
      const deletedBlueprint = await deleteBlueprint(input)
      return deletedBlueprint
    })
})