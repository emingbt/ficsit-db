import { create, verify } from "https://deno.land/x/djwt@v3.0.1/mod.ts"
import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts"

const jwtSecret = Deno.env.get("JWT_SECRET")
const nodeEnv = Deno.env.get("NODE_ENV")

const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(jwtSecret),
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"]
)

export const createToken = async (id: string, ctx: Context) => {
  const jwt = await create(
    {
      alg: "HS512",
      typ: "JWT"
    },
    {
      id: id,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7
    },
    key
  )

  ctx.cookies.set('token', jwt, {
    httpOnly: true,
    secure: nodeEnv == "production",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
  })

  return jwt
}

export const verifyToken = async (token: string) => {
  // check if token is valid, and did not expire then return the id
  const payload = await verify(token, key)

  if (!payload) {
    throw new Error("Invalid token")
  }

  const id = payload?.id as string
  const expiresAt = payload?.expiresAt as number || 0

  if (expiresAt < Date.now()) {
    throw new Error("Token expired")
  }

  return id
}