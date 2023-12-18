import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts"
import userModel from "../models/user.ts"
import { createUser, getUserById, loginUser } from "../services/user.ts"
import { createToken, verifyToken } from "../utils/jwt.ts"

const router = new Router()

router.get("/", async (ctx) => {
  // get all users
  const allUsers = await userModel.find({})
  ctx.response.body = { users: allUsers }
  ctx.response.status = 200
})

router.post("/signup", async (ctx) => {
  const { username, email, password } = await ctx.request.body().value

  try {
    const newUser = await createUser(username, email, password)

    // Create a token
    await createToken(newUser.id, ctx)

    ctx.response.body = { user: newUser }
    ctx.response.status = 201
  } catch (error) {
    ctx.response.body = { message: error.message }
    ctx.response.status = 400
  }
})

router.post("/login", async (ctx) => {
  const { username, password } = await ctx.request.body().value

  try {
    const user = await loginUser(username, password)

    // Create a token
    await createToken(user.id, ctx)

    ctx.response.body = { user: user }
    ctx.response.status = 200
  } catch (error) {
    ctx.response.body = { message: error.message }
    ctx.response.status = 400
  }
})

router.get("/logout", (ctx) => {
  ctx.cookies.set("token", "", { httpOnly: true, secure: true, expires: new Date(Date.now()) })

  ctx.response.body = { message: "Logged out" }
  ctx.response.status = 200
})

// Me;
// Return the user from the token
router.get("/me", async (ctx) => {
  const token = ctx.request.headers.get("Authorization")?.split(" ")[1]

  if (!token) {
    ctx.response.body = { message: "Not logged in" }
    ctx.response.status = 400
    return
  }

  try {
    // Verify the token, get user id
    const id = await verifyToken(token)

    const user = await getUserById(id)

    ctx.response.body = { user: user }
    ctx.response.status = 200
  } catch (error) {
    ctx.response.body = { message: error.message }
    ctx.response.status = 400
  }
})

router.get("/users", async (ctx) => {
  const token = ctx.request.headers.get("Authorization")?.split(" ")[1]

  if (!token) {
    ctx.response.body = { message: "Not logged in" }
    ctx.response.status = 400
    return
  }

  try {
    // Verify the token
    const id = await verifyToken(token)

    const user = await getUserById(id)

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
  } catch (error) {
    ctx.response.body = { message: error.message }
    ctx.response.status = 400
  }
})

router.delete("/users/:id", async (ctx) => {
  const id = ctx.params.id

  const user = await userModel.deleteMany({ id: id })

  ctx.response.body = { user: user }
  ctx.response.status = 200
})

export default router
