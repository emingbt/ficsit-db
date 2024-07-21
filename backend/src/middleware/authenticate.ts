import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "../utils/jwt"

const prisma = new PrismaClient()

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    const payload = verifyToken(token)
    const pioneer = await prisma.pioneer.findUnique({
      where: {
        id: payload.id,
      },
    })

    if (!pioneer) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    req.body.pioneer = pioneer
    next()
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" })
  }
}

export default authenticate