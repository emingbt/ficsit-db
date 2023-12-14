import { decode } from "https://deno.land/std@0.200.0/encoding/base64.ts"
import { create, verify } from "https://deno.land/x/djwt@v3.0.1/mod.ts"

// const key = await crypto.subtle.generateKey(
//   { name: "HMAC", hash: "SHA-512" },
//   true,
//   ["sign", "verify"]
// )
const jwtSecret = Deno.env.get("JWT_SECRET") || "secret"

const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(jwtSecret),
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"]
)

export const createToken = async (id: string) => {
  const jwt = await create(
    {
      alg: "HS512",
      typ: "JWT"
    },
    {
      id: id,
      expiresAt: Date.now() + 1000 * 10
    },
    key
  )

  console.log(key, JSON.stringify(key))
  return jwt
}

export const verifyToken = async (token: string) => {
  // check if token is valid, and did not expire
  const payload = await verify(token, key)

  return payload
}