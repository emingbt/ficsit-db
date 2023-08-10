import bcrypt from "bcrypt"
import { prisma } from "../prisma"
import createError from "http-errors"

const getAllUsers = async () => {
  const users = await prisma.user.findMany()

  return users
}

const deleteUser = async (
  userId: string,
  password: string
) => {
  // Check if user exists and password is correct
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  // If user does not exist, throw error
  if (!user) {
    throw createError(404, 'User does not exist')
  }

  // If password is incorrect, throw error
  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw createError(400, 'Password is incorrect')
  }

  // Delete all blueprints by user
  await prisma.blueprint.deleteMany({
    where: {
      designerId: userId
    }
  })

  // Delete user
  const deletedUser = await prisma.user.delete({
    where: {
      id: userId
    }
  })

  return deletedUser
}

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })

  // If user does not exist, throw error
  if (!user) {
    throw createError(404, 'User does not exist')
  }

  return user
}

const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  // If user does not exist, throw error
  if (!user) {
    throw createError(404, 'User does not exist')
  }

  return user
}

// Export modules
export {
  getAllUsers,
  deleteUser,
  getUserById,
  getUserByUsername
}