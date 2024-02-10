import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts"
import {
  createUser,
  getUserById,
  loginUser,
  forgotPassword,
  resetPassword
} from "../services/user.ts"
import { createToken, verifyToken } from "../utils/jwt.ts"

const router = new Router()

router.post("/signup", async (ctx) => {
  const { username, email, password } = await ctx.request.body().value

  try {
    const newUser = await createUser(username, email, password)

    // Create a token
    const token = await createToken(newUser.id)

    ctx.cookies.set('token', token, {
      httpOnly: true,
      secure: Deno.env.get("NODE_ENV") == "development" ? false : true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    })

    ctx.response.body = { user: newUser }
    ctx.response.status = 201
  } catch (error) {
    ctx.response.body = { message: error.message }
    ctx.response.status = 400
  }
})

router.post("/login", async (ctx) => {
  const { email, password } = await ctx.request.body().value

  try {
    const user = await loginUser(email, password)

    // Create a token
    const token = await createToken(user.id)

    ctx.cookies.set('token', token, {
      httpOnly: true,
      secure: Deno.env.get("NODE_ENV") == "development" ? false : true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    })

    ctx.response.body = { user: user }
    ctx.response.status = 200
  } catch (error) {
    ctx.response.body = { message: error.message }
    ctx.response.status = 400
  }
})

router.post("/logout", (ctx) => {
  ctx.cookies.set(
    "token",
    "",
    {
      httpOnly: true,
      secure: Deno.env.get("NODE_ENV") == "development" ? false : true,
      expires: new Date(Date.now())
    }
  )

  ctx.response.body = { message: "Logged out" }
  ctx.response.status = 200
})

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

router.post("/forgot-password", async (ctx) => {
  const { email } = await ctx.request.body().value

  try {
    await forgotPassword(email)

    ctx.response.body = { message: "Email sent" }
    ctx.response.status = 200
  } catch (error) {
    console.log(error.message)
    ctx.response.body = { message: error.message }
    ctx.response.status = 400
  }
})

router.post("/reset-password", async (ctx) => {
  const { resetToken, password } = await ctx.request.body().value

  try {
    // Reset the password
    await resetPassword(resetToken, password)

    ctx.response.body = { message: "Password reset" }
    ctx.response.status = 200
  } catch (error) {
    ctx.response.body = { message: error.message }
    ctx.response.status = 400
  }
})

export default router
