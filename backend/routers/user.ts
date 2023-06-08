import { protectedProcedure, publicProcedure, router } from "../utils/trpc"
import z from 'zod'
import {
  getAllUsers,
  getUserByUsername,
  createUser,
  loginUser,
  forgotPassword,
  deleteUser,
  resetPassword
} from "../services/user"

export const userRouter = router({
  getAllUsers: protectedProcedure
    .query(async () => {
      const users = await getAllUsers()
      return users
    }),
  deleteUser: protectedProcedure
    .input(z.object({ password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const deletedUser = await deleteUser({ input, ctx })
      return deletedUser
    }),
  getUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const user = await getUserByUsername(input)
      return user
    }),
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(8).max(16)
    }))
    .mutation(async ({ input, ctx }) => {
      const user = await loginUser({ input, ctx })
      return user
    }),
  register: publicProcedure
    .input(z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(8).max(16)
    }))
    .mutation(async ({ input, ctx }) => {
      const user = await createUser({ input, ctx })
      return user
    }),
  forgotPassword: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const sentAddress = await forgotPassword(input)
      return sentAddress
    }),
  resetPassword: protectedProcedure
    .input(z.object({
      token: z.string(),
      password: z.string().min(8).max(16)
    }))
    .mutation(async ({ input, ctx }) => {
      const user = await resetPassword({ input, ctx })
      return user
    })
})