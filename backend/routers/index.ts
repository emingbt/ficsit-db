import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts"
import User from "../models/user.ts"

const router = new Router()

router.get("/", (ctx) => {
  ctx.response.body = "Hello world!"
})

router.get("/users", async (ctx) => {
  ctx.response.body = await User.find()
})

router.post("/user", async (ctx) => {
  const { name, email, password } = await ctx.request.body().value

  const user = new User({
    name: name,
    email: email,
    password: password
  })

  await user.save()

  ctx.response.status = 200
  ctx.response.body = user
})

router.delete("/user/:id", async (ctx) => {
  const id = ctx.params.id

  await User.deleteOne({ _id: id })

  ctx.response.status = 200
  ctx.response.body = { id }
})

export default router
