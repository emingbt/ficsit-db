import { protectedProcedure, publicProcedure, router } from "../utils/trpc"
import z from 'zod'
import {
  getUserByUsername,
  getUser,
  createUser
} from "../services/user"

export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const user = await getUserByUsername(input)
      return user
    }),
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const token = await getUser(input)
      return token
    }),
  register: publicProcedure
    .input(z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const token = await createUser(input)
      return token
    }),
})