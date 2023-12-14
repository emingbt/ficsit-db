import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"
import userModel from "../models/user.ts"
import { createToken, verifyToken } from "../utils/jwt.ts"

const router = new Router()

router.post("/signup", async (ctx) => {
  const { username, email, password } = await ctx.request.body().value

  // Check if username and email is available
  const user = await userModel.findOne({ username: username })
  const userEmail = await userModel.findOne({ email: email })

  if (user) {
    ctx.response.body = { message: "Username is not available" }
    ctx.response.status = 400
    return
  }

  if (userEmail) {
    ctx.response.body = { message: "Email is not available" }
    ctx.response.status = 400
    return
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password)

  // Create a user
  const newUser = await userModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  })

  // Create a token
  const token = await createToken(newUser.id)

  ctx.cookies.set("token", token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) })

  // Remove the password of the user before sending it
  newUser.password = ""

  ctx.response.body = { user: newUser }
  ctx.response.status = 201
})

router.post("/login", async (ctx) => {
  const { username, password } = await ctx.request.body().value

  // Check if user exists
  const user = await userModel.findOne({ username: username })

  if (!user) {
    ctx.response.body = { message: "User does not exist" }
    ctx.response.status = 404
    return
  }

  // Check if password is correct
  const passwordCorrect = await bcrypt.compare(password, user.password)

  if (!passwordCorrect) {
    ctx.response.body = { message: "Password is incorrect" }
    ctx.response.status = 400
    return
  }

  // Create a token
  const token = await createToken(user.id)

  ctx.cookies.set("token", token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) })

  // Remove the password of the user before sending it
  user.password = ""

  ctx.response.body = { user: user }
  ctx.response.status = 200
})

router.get("/logout", (ctx) => {
  ctx.cookies.set("token", "", { httpOnly: true, secure: true, expires: new Date(Date.now()) })

  ctx.response.body = { message: "Logged out" }
  ctx.response.status = 200
})

// Me;
// Return the user from the token
router.get("/me", async (ctx) => {
  const token = await ctx.cookies.get("token")

  if (!token) {
    ctx.response.body = { message: "Not logged in" }
    ctx.response.status = 400
    return
  }

  // Verify the token
  const payload = await verifyToken(token)

  // Get the user from the payload
  const user = await userModel.findOne({ _id: payload.id })

  if (!user) {
    ctx.response.body = { message: "User does not exist" }
    ctx.response.status = 404
    return
  }

  // Remove the password of the user before sending it
  user.password = ""

  ctx.response.body = { user: user }
  ctx.response.status = 200
})

router.get("/users", async (ctx) => {
  const token = await ctx.cookies.get("token")

  if (!token) {
    ctx.response.body = { message: "Not logged in" }
    ctx.response.status = 400
    return
  }

  // Verify the token
  const payload = await verifyToken(token)

  // Get the user from the payload
  const user = await userModel.findOne({ _id: payload.id })

  if (!user) {
    ctx.response.body = { message: "User does not exist" }
    ctx.response.status = 404
    return
  }

  if (user.role !== "admin") {
    ctx.response.body = { message: "Not authorized" }
    ctx.response.status = 401
    return
  }

  // Get all users
  const users = await userModel.find({})

  // Remove the password of the users before sending it
  users.forEach((user) => {
    user.password = ""
  })

  ctx.response.body = { users: users }
  ctx.response.status = 200
})

export default router
