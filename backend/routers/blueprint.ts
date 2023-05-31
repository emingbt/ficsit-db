import { protectedProcedure, publicProcedure, router } from "../utils/trpc"
import z from 'zod'
import {
  getAllBlueprints,
  getBlueprintById,
  createBlueprint,
  updateBlueprint,
  deleteBlueprint,
  getBlueprintByDesignerId
} from "../services/blueprint"

export const blueprintRouter = router({
  getAllBlueprints: publicProcedure
    .query(async () => {
      const allBlueprints = await getAllBlueprints()
      return allBlueprints
    }),
  getBlueprintById: publicProcedure
    .input(z.object({ blueprintId: z.string() }))
    .query(async ({ input }) => {
      const blueprint = await getBlueprintById(input)
      return blueprint
    }),
  getBlueprintByDesignerId: publicProcedure
    .input(z.object({ designerId: z.string() }))
    .query(async ({ input }) => {
      const blueprints = await getBlueprintByDesignerId(input)
      return blueprints
    }),
  createBlueprint: protectedProcedure
    .input(z.object({
      title: z.string(),
      description: z.string(),
      fileLinks: z.array(z.string()),
      imageLinks: z.array(z.string()),
      categories: z.array(z.string()),
      designerId: z.string()
    }))
    .mutation(async ({ input }) => {
      const createdBlueprint = await createBlueprint(input)
      return createdBlueprint
    }),
  updateBlueprint: protectedProcedure
    .input(z.object({
      id: z.string(),
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
  deleteBlueprint: protectedProcedure
    .input(z.object({ blueprintId: z.string() }))
    .mutation(async ({ input }) => {
      const deletedBlueprint = await deleteBlueprint(input)
      return deletedBlueprint
    })
})