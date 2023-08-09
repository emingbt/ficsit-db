import bcrypt from 'bcrypt'
import express from 'express'
import { prisma } from '../prisma'
import createErrors from 'http-errors'
import { sendEmail } from '../utils/nodemailer'
import {
  generateToken,
  verifyToken
} from '../utils/auth'



const router = express.Router()

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    if (!user) {
      res.status(404)
      res.json({
        message: 'User not found'
      })
      return
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    // Check if password is correct
    if (!isPasswordCorrect) {
      res.status(401)
      res.json({
        message: 'Invalid password'
      })
      return
    }

    // Generate token
    const token = `Bearer ${generateToken(user.id)}`

    // Send user and put token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 1 month
    })
    res.json(user)
  } catch (error) {
    return next(error)
  }
})

// Logout
router.post('/logout', async (req, res) => {
  res.clearCookie('token')
  res.json({
    message: 'Logged out'
  })
})

// Signup
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, email } = req.body

    // Check if username is already taken
    const userWithUsername = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    // If username is taken, throw error with status code 400 and message
    if (userWithUsername) {
      throw new createErrors.BadRequest('Username is already taken')
    }

    // Check if email is already taken
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (userWithEmail) {
      throw new createErrors.BadRequest('There is already an account with this email')
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

    // Send user and put token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 1 month
    })
    res.json(user)
  } catch (error) {
    return next(error)
  }
})

// Forgot password
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new createErrors.NotFound('User not found')
    }

    // Generate token
    const token = `Bearer ${generateToken(user.id, "RESET_PASSWORD")}`

    // Send token to user's email
    sendEmail(
      email,
      token,
      "RESET_PASSWORD"
    )

    res.json({
      message: `Password reset link sent to ${email}`
    })
  } catch (error: any) {
    return next(error)
  }

})

// Reset password
router.post('/reset-password', async (req, res, next) => {
  const { newPassword } = req.body
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    // Verify token
    const userId = verifyToken(token, "RESET_PASSWORD")

    // Check if user exists 
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new Error('Invalid token!')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update user's password
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashedPassword
      }
    })

    res.json({
      message: 'Password reset'
    })
  } catch (error) {
    return next(error)
  }
})

export const authRouter = router