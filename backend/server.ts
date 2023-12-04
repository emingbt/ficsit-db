import { Application } from "https://deno.land/x/oak/mod.ts"

const app = new Application()

// Logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get("X-Response-Time")
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
})

// Timing
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.response.headers.set("X-Response-Time", `${ms}ms`)
})

// Hello World!
app.use((ctx) => {
  ctx.response.body = "Hello World!"
})

// Start server, console.log to confirm it's working
console.log("%cServer running on %chttp://localhost:8000", "color: green", "color: blue")
await app.listen({ port: 8000 })