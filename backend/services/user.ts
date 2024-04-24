import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"
import userModel from "../models/user.ts"
import { createToken, verifyToken } from "../utils/jwt.ts"
import { sendPasswordResetEmail } from "../utils/nodemailer.ts"

const createUser = async (username: string, email: string, password: string) => {
  // Check if username and email is available
  const userEmail = await userModel.findOne({ email: email })
  if (userEmail) {
    throw new Error("There is already an account with this email", { cause: "emailTaken" })
  }

  const user = await userModel.findOne({ username: username })
  if (user) {
    throw new Error("Username is already taken", { cause: "usernameTaken" })
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password)

  // Create a user
  const newUser = await userModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  })

  // Remove the password of the user before sending it
  newUser.password = ""

  return newUser
}

const loginUser = async (email: string, password: string) => {
  // Check if user exists
  const user = await userModel.findOne({ email: email })

  if (!user) {
    throw new Error("User does not exist")
  }

  // Check if password is correct
  const passwordCorrect = bcrypt.compareSync(password, user.password)

  if (!passwordCorrect) {
    throw new Error("Password is incorrect")
  }

  // Remove the password of the user before sending it
  user.password = ""

  return user
}

const forgotPassword = async (email: string) => {
  // Check if user exists
  const user = await userModel.findOne({ email: email })

  if (!user) {
    throw new Error("User does not exist")
  }

  // Send email with password reset link
  const token = await createToken(user.id)

  try {
    await sendPasswordResetEmail(email, token)
  } catch (error) {
    console.error(error.message)
    throw new Error("Could not send email")
  }
}

const resetPassword = async (token: string, password: string) => {
  // Verify the token, get user id
  const id = await verifyToken(token)

  // Check if user exists
  const user = await userModel.findOne({ id })

  if (!user) {
    throw new Error("User does not exist")
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password)

  // Update the user's password
  await userModel.updateOne({ id: id }, { password: hashedPassword })
}

const getUserById = async (id: string) => {
  // get user by id
  const user = await userModel.findOne({ id: id })

  if (!user) {
    throw new Error("User does not exist")
  }

  // Remove the password of the user before sending it
  user.password = ""

  return user
}

const getUserByUsername = async (username: string) => {
  // Check if user exists
  const user = await userModel.findOne({ username: username })

  if (!user) {
    throw new Error("User does not exist")
  }

  // Remove the password of the user before sending it
  user.password = ""

  return user
}

export { createUser, loginUser, forgotPassword, resetPassword, getUserById, getUserByUsername }