import jwt from 'jsonwebtoken'

const privateKey = process.env.JWT_SECRET

interface TokenPayload {
  id: number
  role: string
}

export function createToken(payload: object) {
  if (!privateKey) {
    throw new Error("JWT_SECRET is not defined")
  }

  return jwt.sign(payload, privateKey, {
    algorithm: "HS256",
    expiresIn: "7d"
  })
}

export function verifyToken(token: string) {
  if (!privateKey) {
    throw new Error("JWT_SECRET is not defined")
  }

  const decoded = jwt.verify(token, privateKey) as TokenPayload

  return decoded
}