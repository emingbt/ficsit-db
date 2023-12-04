import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts"

const books = [
  {
    id: "1",
    title: "The Hound of the Baskervilles"
  },
  {
    id: "2",
    title: "Romeo and Juliet"
  }
]

const router = new Router()

router.get("/", (ctx) => {
  ctx.response.body = "Hello world!"
})

router.get("/books", (ctx) => {
  ctx.response.body = books
})

router.get("/book/:id", (ctx) => {
  if (ctx.params && ctx.params.id) {
    const book = books.filter((book) => book.id === ctx.params.id)

    ctx.response.body = book
    return
  }

  ctx.response.status = 404
  ctx.response.body = { message: "Not found" }
})

export default router
