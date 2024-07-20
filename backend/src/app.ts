import express from "express"
import router from "./routes"

const app = express()

app.use("/", router)

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})