import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany()
  return allUsers
}

export const getUserById = async (input: { userId: number }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: input.userId
    }
  })

  return user
}

export const createUser = async (input:
  {
    username: string,
    email: string,
    password: string
  }) => {
  const createdUser = await prisma.user.create({
    data: {
      username: input.username,
      email: input.email,
      password: input.password,
    }
  })

  return createdUser
}