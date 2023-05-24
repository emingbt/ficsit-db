import { publicProcedure, router } from "../utils/trpc"
import z from 'zod'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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
  getAllUsers: publicProcedure
    .query(async () => {
      const allUsers = await prisma.user.findMany()
      return allUsers
    }),
  getUserById: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(({ input }) => {
      return mockUsers.find((user) => user.id === input.userId)
    }),
  createUser: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      const createdUser = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        }
      })

      return createdUser
    }),
})