import { publicProcedure, router } from "../utils/trpc"
import z from 'zod'
import {
  getAllUsers,
  getUserById,
  createUser
} from "../services/user"

export const userRouter = router({
  getAllUsers: publicProcedure
    .query(async () => {
      const allUsers = await getAllUsers()
      return allUsers
    }),
  getUserById: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const user = await getUserById(input)
      return user
    }),
  createUser: publicProcedure
    .input(z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const createdUser = await createUser(input)
      return createdUser
    }),
})