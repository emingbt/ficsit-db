import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts"
import User from "../models/user.ts"

const router = new Router()

router.get("/", (ctx) => {
  ctx.response.body = "Hello world!"
})

router.get("/users", async (ctx) => {
  ctx.response.body = await User.find()
})

router.get("/user/:name", (ctx) => {
  const { name } = ctx.params
  const user = new User({
    name: name,
    email: "test@test.com",
    password: "123456"
  })

  user.save()

  ctx.response.status = 200
  ctx.response.body = user
})

export default router
