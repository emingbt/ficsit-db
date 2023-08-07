import express from 'express'
import { prisma } from '../prisma'

const router = express.Router()

// Get all users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()

  res.json(users)
})

// Get user by id
router.get('/:id', async (req, res) => {
  const { id } = req.params

  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })

  if (!user) {
    res.status(404)
    res.json({
      message: 'User not found'
    })
    return
  }

  res.json(user)
})

// Get user by username
router.get('/username/:username', async (req, res) => {
  const { username } = req.params

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

  res.json(user)
})

// Create user
router.post('/', async (req, res) => {
  const { username, password, email } = req.body

  const user = await prisma.user.create({
    data: {
      username,
      password,
      email
    }
  })

  // if user could not be created, throw error
  if (!user) {
    res.status(400)
    res.json({
      message: 'User could not be created'
    })
    return
  }

  res.json(user)
})

// Delete user
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })

  if (!user) {
    res.status(404)
    res.json({
      message: 'User not found'
    })
    return
  }

  await prisma.user.delete({
    where: {
      id: id
    }
  })

  res.json({
    message: 'User deleted'
  })
})

// Export router as usersRouter
export const usersRouter = router