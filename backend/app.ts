import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { expressHandler } from 'trpc-playground/handlers/express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './routers'
import { createContext } from './utils/context'
import path from 'path'

const runApp = async () => {
  const app = express()

  const trpcApiEndpoint = '/trpc'
  const playgroundEndpoint = '/trpc-playground'

  app.set("views", path.join(__dirname, "views"))
  app.set("view engine", "pug")

  app.use(
    trpcApiEndpoint,
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext
    }),
  )

  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint,
      playgroundEndpoint,
      router: appRouter,
    }),
  )

  app.listen(8080, () => {
    console.log('listening at http://localhost:8080')
  })
}

runApp()