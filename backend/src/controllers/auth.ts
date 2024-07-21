import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { createToken } from '../utils/jwt'

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const pioneer = await prisma.pioneer.findFirst({
    where: {
      email,
    },
  })

  if (!pioneer) {
    return res.status(401).json({ error: "There isn't a pioneer with that email." })
  }

  const passwordMatch = bcrypt.compareSync(password, pioneer.password)
  if (passwordMatch == false) {
    return res.status(401).json({ error: 'Password is incorrect.' })
  }

  const token = createToken({
    id: pioneer.id,
    role: pioneer.role,
  })

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })

  res.json({
    name: pioneer.name,
  })
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const pioneerExists = await prisma.pioneer.findFirst({
    where: {
      OR: [
        { email },
        { name },
      ],
    },
  })

  if (pioneerExists) {
    return res.status(400).json({ error: 'Email or name already exists.' })
  }

  try {
    const pioneer = await prisma.pioneer.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      },
    })

    const token = createToken({
      id: pioneer.id,
      role: pioneer.role,
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    res.json({
      name: pioneer.name,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
}

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out' })
}

export const me = async (req: Request, res: Response) => {
  const pioneer = req.body.pioneer

  res.json({
    name: pioneer.name,
    email: pioneer.email,
    createdAt: pioneer.createdAt,
  })
}