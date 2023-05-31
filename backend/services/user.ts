import { PrismaClient } from '@prisma/client'
import { generateToken } from '../utils/auth'

const prisma = new PrismaClient()

export const getUserByUsername = async (input: { username: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      username: input.username
    }
  })

  return user
}

export const getUser = async (input:
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

  return { token, user }
}

export const createUser = async (input:
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