import express from 'express'
import { usersRouter } from './routers/users'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', usersRouter)

app.listen(8080, () => {
  console.log('Server listening on port 8080!')
})
