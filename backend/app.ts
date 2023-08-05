import express, { Request, Response, NextFunction } from 'express'
import { usersRouter } from './routers/users'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Mount routers
app.use('/users', usersRouter)

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500).json({
    message: 'Something went wrong'
  })
})

// Start server
app.listen(8080, () => {
  console.log('Server listening on port 8080!')
})
