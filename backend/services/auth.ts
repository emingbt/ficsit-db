import bcrypt from 'bcrypt'
import { prisma } from '../prisma'
import { TRPCError } from '@trpc/server'
import type { Context } from '../utils/trpc'
import { generateToken, TokenType } from '../utils/auth'
import { sendEmail, EmailType } from '../utils/nodemailer'

const loginUser = async ({ input, ctx }: {
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

const logoutUser = async ({ ctx }: {
  ctx: Context
}) => {
  // Clear cookie
  ctx.res.clearCookie('token')

  return true
}

const forgotPassword = async (input: { email: string }) => {
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

const resetPassword = async ({ input, ctx }: {
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

export {
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword
}