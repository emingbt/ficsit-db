import express from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../prisma'
import { generateToken } from '../utils/auth'

const router = express.Router()

// Login
router.post('/login', async (req, res) => {
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

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Check if password is correct
  if (user.password !== hashedPassword) {
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
})

// Logout
router.post('/logout', async (req, res) => {
  res.clearCookie('token')
  res.json({
    message: 'Logged out'
  })
})

// Signup
router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body

  // Check if username is already taken
  const userWithUsername = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  if (userWithUsername) {
    throw new Error('Username is already taken')
  }

  // Check if email is already taken
  const userWithEmail = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (userWithEmail) {
    throw new Error('There is already a user with this email')
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
})

export const authRouter = router