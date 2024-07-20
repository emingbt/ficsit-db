import 'dotenv/config'
import express from "express"
import router from "./routes"

const app = express()
app.use(express.json())

app.use("/", router)

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})