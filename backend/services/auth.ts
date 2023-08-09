import bcrypt from 'bcrypt'
import { prisma } from '../prisma'
import createError from 'http-errors'
import { sendEmail } from '../utils/nodemailer'
import { generateToken, verifyToken } from '../utils/auth'

const loginUser = async (
  email: string,
  password: string
) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  // If user does not exist, throw error
  if (!user) {
    throw createError(404, 'User does not exist')
  }

  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  )

  // If password is incorrect, throw error
  if (!isPasswordCorrect) {
    throw createError(400, 'Password is incorrect')
  }

  // Generate token
  const token = `Bearer ${generateToken(user.id)}`

  // Return user and token
  user.password = ''
  return { user, token }
}

const forgotPassword = async (email: string) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  // If user does not exist, throw error
  if (!user) {
    throw createError(404, 'User does not exist')
  }

  // Generate password reset token
  const passwordResetToken = generateToken(
    user.id,
    "RESET_PASSWORD"
  )

  // Send email with password reset link and return sent address
  const sentAddress = sendEmail(
    user.email,
    passwordResetToken,
    "RESET_PASSWORD"
  )
  return sentAddress
}

const resetPassword = async (
  password: string,
  resetToken: string
) => {
  // Verify token
  const userId = verifyToken(resetToken, "RESET_PASSWORD")

  if (!userId) {
    throw createError(401, 'Unauthorized')
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  // If user does not exist, throw error
  if (!user) {
    throw createError(404, 'User does not exist')
  }

  // Change password
  const hashedPassword = await bcrypt.hash(password, 10)
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      password: hashedPassword
    }
  })

  // If user does not exist, throw error
  if (!updatedUser) {
    throw createError(500, 'User could not be updated')
  }

  // Generate token
  const token = `Bearer ${generateToken(updatedUser.id)}`

  // Return user and token
  updatedUser.password = ''
  return { updatedUser, token }
}

export {
  loginUser,
  forgotPassword,
  resetPassword
}