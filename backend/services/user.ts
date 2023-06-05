import bcrypt from 'bcrypt'
import { TRPCError } from '@trpc/server'
import { prisma } from '../prisma'
import type { Context } from '../utils/trpc'
import { generateToken, TokenType } from '../utils/auth'
import { EmailType, sendEmail } from '../utils/nodemailer'

export const getAllUsers = async () => {
  const users = await prisma.user.findMany()

  return users
}

export const deleteUser = async (input: { id: string }) => {
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

  // Delete user
  const deletedUser = await prisma.user.delete({
    where: {
      id: input.id
    }
  })

  return deletedUser
}

export const getUserById = async (input: { id: string }) => {
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

export const getUserByUsername = async (input: { username: string }) => {
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

export const loginUser = async ({ input, ctx }: {
  input: {
    email: string,
    password: string
  },
  ctx: Context
}) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email: input.email
    }
  })

  // If user does not exist, throw error
  if (!user) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'User does not exist'
    })
  }

  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    input.password,
    user.password
  )

  // If password is incorrect, throw error
  if (!isPasswordCorrect) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Password is incorrect'
    })
  }

  // Generate token
  const token = `Bearer ${generateToken(user.id)}`

  // Set token in cookie
  ctx.res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 1 month
  })

  // Remove password and return user
  user.password = ''
  return user
}

export const createUser = async ({ input, ctx }: {
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
    token,
    EmailType.EMAIL_VERIFICATION,
    createdUser.username
  )

  // Remove password and return user
  createdUser.password = ''
  return createdUser
}

export const logoutUser = async ({ ctx }: {
  ctx: Context
}) => {
  // Clear cookie
  ctx.res.clearCookie('token')

  return true
}

export const forgotPassword = async (input: { email: string }) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email: input.email
    }
  })

  // If user does not exist, throw error
  if (!user) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User does not exist'
    })
  }

  // Generate password reset token
  const passwordResetToken = generateToken(
    user.id,
    TokenType.RESET_PASSWORD
  )

  // Send email with password reset link and return sent address
  const sentAddress = sendEmail(
    user.email,
    passwordResetToken,
    EmailType.RESET_PASSWORD
  )
  return sentAddress
}

export const resetPassword = async ({ input, ctx }: {
  input: {
    password: string,
    token: string
  },
  ctx: Context
}) => {
  // If context does not have userId, throw error
  // Actually, this should never happen, because
  // there is a middleware that checks if token is valid
  // But typescript does not know that
  if (!ctx.userId) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid token'
    })
  }

  // Change password
  const hashedPassword = await bcrypt.hash(input.password, 10)
  const updatedUser = await prisma.user.update({
    where: {
      id: ctx.userId
    },
    data: {
      password: hashedPassword
    }
  })

  // If user does not exist, throw error
  if (!updatedUser) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User does not exist'
    })
  }

  // Generate token
  const token = `Bearer ${generateToken(updatedUser.id)}`

  // Set token in cookie
  ctx.res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 1 month
  })

  // Remove password and return user
  updatedUser.password = ''
  return updatedUser
}