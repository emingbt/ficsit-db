import express, { Request, Response, NextFunction } from 'express'
import router from './routers'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Mount routers
app.use('/', router)

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Something went wrong'

  console.log(err)

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
})

// Start server
app.listen(8080, () => {
  console.log('Server listening on port 8080!')
})
