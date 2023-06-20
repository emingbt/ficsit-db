import bcrypt from 'bcrypt'
import { TRPCError } from '@trpc/server'
import { prisma } from '../prisma'
import type { Context } from '../utils/trpc'
import { generateToken } from '../utils/auth'
import { EmailType, sendEmail } from '../utils/nodemailer'

const getAllUsers = async () => {
  const users = await prisma.user.findMany()

  return users
}

const deleteUser = async ({ input, ctx }: {
  input: { password: string },
  ctx: Context
}) => {
  // Check if user exists and password is correct
  const user = await prisma.user.findUnique({
    where: {
      id: ctx.userId
    }
  })

  // If user does not exist, throw error
  if (!user) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User does not exist' })
  }

  // If password is incorrect, throw error
  const passwordMatch = await bcrypt.compare(input.password, user.password)

  if (!passwordMatch) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Incorrect password' })
  }

  // Delete all blueprints by user
  await prisma.blueprint.deleteMany({
    where: {
      designerId: ctx.userId
    }
  })

  // Delete user
  const deletedUser = await prisma.user.delete({
    where: {
      id: ctx.userId
    }
  })

  return deletedUser
}

const getUserById = async (input: { id: string }) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      id: input.id
    }
  })

  // If user does not exist, throw error
  if (!user) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User does not exist' })
  }

  return user
}

const getUserByUsername = async (input: { username: string }) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      username: input.username
    }
  })

  // If user does not exist, throw error
  if (!user) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User does not exist' })
  }

  return user
}

const createUser = async ({ input, ctx }: {
  input: {
    username: string,
    email: string,
    password: string
  },
  ctx: Context
}) => {
  // Check if username or email is already taken
  const isUsernameTaken = await prisma.user.findFirst({
    where: {
      username: input.username
    }
  })

  // If user with username exists, throw error
  if (isUsernameTaken) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'This username is already taken'
    })
  }

  const isEmailTaken = await prisma.user.findFirst({
    where: {
      email: input.email
    }
  })

  // If user with email exists, throw error

  if (isEmailTaken) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'This email is already taken'
    })
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(input.password, 10)

  // Create user
  const createdUser = await prisma.user.create({
    data: {
      username: input.username,
      email: input.email,
      password: hashedPassword
    }
  })

  // Generate token
  const token = `Bearer ${generateToken(createdUser.id)}`

  // Set token in cookie
  ctx.res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 1 month
  })

  // Send verification email
  sendEmail(
    createdUser.email,
    token.split(' ')[1],
    EmailType.EMAIL_VERIFICATION,
    createdUser.username
  )

  // Remove password and return user
  createdUser.password = ''
  return createdUser
}

// Export modules
export {
  getAllUsers,
  deleteUser,
  getUserById,
  getUserByUsername,
  createUser
}