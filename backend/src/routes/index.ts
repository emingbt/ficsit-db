import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.send("Welcome to FicsitDB!")
})

router.get("/about", (req, res) => {
  res.send("About Us")
})

export default router