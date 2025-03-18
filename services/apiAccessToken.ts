import 'server-only'

import db from "../utils/postgres"
import { ApiAccessToken } from "../drizzle/schema"
import { desc } from "drizzle-orm"

// This function is used to get API access token from the database
// This token is used to talk with the Kinde API, which is
// currently used authentication service.
export async function getCurrentAPIAccessToken() {
  // 1. Get the last written access token from the database
  const currentAccessToken = (await db.select()
    .from(ApiAccessToken)
    .orderBy(desc(ApiAccessToken.id))
    .limit(1))[0]

  // 2.1 If the last access token is still valid, return it
  if (currentAccessToken && currentAccessToken.expiresAt > new Date()) {
    return currentAccessToken.accessToken
  }
  // 2.2 If the last access token is not valid, return undefined
  else {
    return undefined
  }
}

export async function addAPIAccessToken({ accessToken, expiresAt }: {
  accessToken: string,
  expiresAt: Date
}) {
  try {
    await db.insert(ApiAccessToken).values({
      accessToken: accessToken,
      expiresAt: expiresAt
    })
  } catch (error) {
    console.log(error)
    throw new Error('Failed to add API access token to the database.')
  }
}