import express from 'express'
import {
  login,
  signup,
  forgotPassword,
  resetPassword
} from '../services/auth'

const router = express.Router()

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    const { user, token } = await login(email, password)

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

    const { user, token } = await signup(username, password, email)

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

    await forgotPassword(email)

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
  const resetToken = req.headers.authorization?.split(' ')[1]

  if (!resetToken) {
    return res.status(401).send('Unauthorized')
  }

  try {
    const { updatedUser, token } = await resetPassword(newPassword, resetToken)

    // Send user and put token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 1 month
    })
    res.json(updatedUser)
  } catch (error) {
    return next(error)
  }
})

export const authRouter = router