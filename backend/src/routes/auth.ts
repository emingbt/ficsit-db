import { Router } from "express"
import { PrismaClient } from '@prisma/client'
import validate from "../middleware/validate"
import { loginSchema, signUpSchema } from "../lib/authSchemas"
import { createToken, verifyToken } from "../utils/jwt"

const authRouter = Router()
const prisma = new PrismaClient()

authRouter.post("/login", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body

  const pioneer = await prisma.pioneer.findFirst({
    where: {
      email
    }
  })

  if (!pioneer) {
    return res.status(401).json({ error: "There isn't a pioneer with that email." })
  }

  if (pioneer.password !== password) {
    return res.status(401).json({ error: "Password is incorrect." })
  }

  const token = createToken({
    id: pioneer.id,
    role: pioneer.role
  })

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  })

  res.json({
    name: pioneer.name
  })
})

authRouter.post("/signup", validate(signUpSchema), async (req, res) => {
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

  const pioneer = await prisma.pioneer.create({
    data: {
      name,
      email,
      password
    }
  })

  const token = createToken({
    id: pioneer.id,
    role: pioneer.role
  })

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  })

  res.json({
    name: pioneer.name
  })
})

authRouter.get("/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Not authenticated." })
  }

  try {
    const decoded = verifyToken(token) as { id: number, role: string }
    const pioneer = await prisma.pioneer.findUnique({
      where: {
        id: decoded.id
      }
    })

    if (!pioneer) {
      return res.status(401).json({ error: "Not authenticated." })
    }

    res.json({
      name: pioneer.name,
      email: pioneer.email,
      createdAt: pioneer.createdAt
    })
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: "Not authenticated." })
  }
})

export default authRouter