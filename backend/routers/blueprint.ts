import { publicProcedure, router } from "../utils/trpc"
import z from 'zod'
import {
  getAllBlueprints,
  getBlueprintById
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
})