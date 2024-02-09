import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts"
import { createUser, getUserById, loginUser } from "../services/user.ts"
import { createToken, verifyToken } from "../utils/jwt.ts"

const router = new Router()

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

export default router
