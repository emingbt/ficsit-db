import { publicProcedure, router } from "../utils/trpc"
import z from 'zod'

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'example@exapmle.com',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'example2@example.com',
  },
]

export const userRouter = router({
  getAllUsers: publicProcedure.query(() => {
    return mockUsers
  }),
  getUserById: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(({ input }) => {
      return mockUsers.find((user) => user.id === input.userId)
    }),
})