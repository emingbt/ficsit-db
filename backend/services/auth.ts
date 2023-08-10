import bcrypt from 'bcrypt'
import { prisma } from '../prisma'
import createError from 'http-errors'
import { sendEmail } from '../utils/nodemailer'
import { generateToken, verifyToken } from '../utils/auth'

const login = async (
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
    throw createError(404, 'There is no user with this email')
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

const signup = async (
  username: string,
  password: string,
  email: string
) => {
  // Check if username is already taken
  const userWithUsername = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  if (userWithUsername) {
    throw createError(409, 'Username is already taken')
  }

  // Check if email is already taken
  const userWithEmail = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (userWithEmail) {
    throw createError(409, 'There is already an account with this email')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
      email: email
    }
  })

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
    throw createError(404, 'User not found')
  }

  // Generate password reset token
  const passwordResetToken = generateToken(
    user.id,
    "RESET_PASSWORD"
  )

  // Send email with password reset link
  sendEmail(
    user.email,
    passwordResetToken,
    "RESET_PASSWORD"
  )

  return
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
  login,
  signup,
  forgotPassword,
  resetPassword
}