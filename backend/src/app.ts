import "dotenv/config"
import express from "express"
import "express-async-errors"
import router from "./routes"
import authRouter from "./routes/auth"
import { errorHandler } from "./middleware/errors"

const app = express()
app.use(express.json())

app.use("/", router)
app.use("/auth", authRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})