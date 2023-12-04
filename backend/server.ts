import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts"

import router from "./routers/index.ts"

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

// Logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get("X-Response-Time")
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
})

// Start server, console.log to confirm it's working
console.log("%cServer running on %chttp://localhost:8000", "color: green", "color: blue")
await app.listen({ port: 8000 })