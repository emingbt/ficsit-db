import { Router } from "express"
import { PrismaClient } from '@prisma/client'
import validate from "../middleware/validate"
import { signUpSchema } from "../lib/authSchemas"

const router = Router()
const prisma = new PrismaClient()

router.get("/", (req, res) => {
  res.send("Welcome to FicsitDB!")
})

router.get("/about", (req, res) => {
  res.send("About Us")
})

router.get("/pioneers", async (req, res) => {
  const pioneers = await prisma.pioneer.findMany()
  res.json(pioneers)
})

router.post("/pioneers", validate(signUpSchema), async (req, res) => {
  const { name, email, password } = req.body

  const pioneerExists = await prisma.pioneer.findFirst({
    where: {
      OR: [
        { email },
        { name }
      ]
    }
  })

  if (pioneerExists) {
    return res.status(400).json({ error: "Email or name already exists." })
  }

  try {
    const pioneer = await prisma.pioneer.create({
      data: {
        name,
        email,
        password
      }
    })
    res.json(pioneer)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong." })
  }
})

export default router