import { PrismaClient } from '@prisma/client'
import { generateToken } from '../utils/auth'

const prisma = new PrismaClient()

export const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany()
  return allUsers
}

export const getUserById = async (input: { userId: string }) => {
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

export const loginUser = async (input:
  {
    email: string,
    password: string
  }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: input.email
    }
  })

  if (!user) {
    throw new Error('No user found')
  }

  const isPasswordValid = user.password === input.password

  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  const token = generateToken(user.id)

  return token
}

export const registerUser = async (input:
  {
    username: string,
    email: string,
    password: string
  }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: input.email
    }
  })

  if (user) {
    throw new Error('User already exists')
  }

  const createdUser = await prisma.user.create({
    data: {
      username: input.username,
      email: input.email,
      password: input.password,
    }
  })

  const token = generateToken(createdUser.id)

  return token
}