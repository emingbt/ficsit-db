import express from 'express'
import { expressHandler } from 'trpc-playground/handlers/express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './routers'

const runApp = async () => {
  const app = express()

  const trpcApiEndpoint = '/trpc'
  const playgroundEndpoint = '/trpc-playground'

  app.use(
    trpcApiEndpoint,
    trpcExpress.createExpressMiddleware({
      router: appRouter,
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