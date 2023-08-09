import express from 'express'
import {
  getAllUsers,
  getUserById,
  getUserByUsername,
  deleteUser
} from '../services/user'

const router = express.Router()

// Get all users
router.get('/', async (req, res) => {
  const users = await getAllUsers()

  res.json(users)
})

// Get user by id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await getUserById(id)

    res.json(user)
  } catch (error) {
    return next(error)
  }
})

// Get user by username
router.get('/username/:username', async (req, res, next) => {
  try {
    const { username } = req.params

    const user = await getUserByUsername(username)

    res.json(user)
  } catch (error) {
    return next(error)
  }
})

// Delete user
router.delete('/', async (req, res, next) => {
  try {
    const { id, password } = req.body

    await deleteUser(id, password)

    res.json({
      message: 'User deleted'
    })
  } catch (error) {
    return next(error)
  }
})

// Export router as usersRouter
export const usersRouter = router