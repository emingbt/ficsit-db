import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts"
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts"
import "https://deno.land/std@0.208.0/dotenv/load.ts"

import { connectMongoDB } from "./utils/mongoose.ts"
import router from "./routers/index.ts"

const app = new Application()
app.use(oakCors())
app.use(router.routes())
app.use(router.allowedMethods())

await connectMongoDB()

// Logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get("X-Response-Time")
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
})

// Start server, console.log to confirm it's working
console.log("%cServer running on %chttp://localhost:8000", "color: green", "color: blue")
await app.listen({ port: 8000 })