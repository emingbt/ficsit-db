import { protectedProcedure, publicProcedure, router } from "../utils/trpc"
import z from 'zod'
import {
  getAllBlueprints,
  getBlueprintById,
  createBlueprint,
  updateBlueprint,
  deleteBlueprint,
  getBlueprintsByDesignerId
} from "../services/blueprint"

export const blueprintRouter = router({
  getAllBlueprints: publicProcedure
    .query(async () => {
      const allBlueprints = await getAllBlueprints()
      return allBlueprints
    }),
  getBlueprintById: protectedProcedure
    .input(z.object({ blueprintId: z.string() }))
    .query(async ({ input }) => {
      const blueprint = await getBlueprintById(input)
      return blueprint
    }),
  getBlueprintByDesignerId: protectedProcedure
    .input(z.object({ designerId: z.string() }))
    .query(async ({ input }) => {
      const blueprints = await getBlueprintsByDesignerId(input)
      return blueprints
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
      id: z.string(),
      title: z.string().nonempty(),
      description: z.string(),
      fileLinks: z.array(z.string()).min(2),
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