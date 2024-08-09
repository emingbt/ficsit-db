import 'server-only'

import { cache } from 'react'
import { addAPIAccessToken, getCurrentAPIAccessToken } from './apiAccessToken'

export const getKindeManagementAPIAccessToken = cache(async () => {
  // 0. If the current access token is still valid, return it
  const currentAccessToken = await getCurrentAPIAccessToken()

  if (currentAccessToken) {
    return currentAccessToken
  }

  // 1. Get Kinde environment variables
  const issuerUrl = process.env.KINDE_ISSUER_URL
  const clientId = process.env.KINDE_CLIENT_ID
  const clientSecret = process.env.KINDE_CLIENT_SECRET

  if (!issuerUrl || !clientId || !clientSecret) {
    throw new Error('Kinde issuer URL, client ID, and client secret must be set in the environment variables.')
  }

  // 2. Get a new access token
  try {
    // 2.1. Request a new access token
    const request = await fetch(`${issuerUrl}/oauth2/token`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        audience: `${issuerUrl}/api`,
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    })

    const data = await request.json() as {
      access_token: string,
      expires_in: number
    }

    // 2.2. Add the new access token in the database
    await addAPIAccessToken({
      accessToken: data.access_token,
      expiresAt: new Date(Date.now() + (data.expires_in * 1000))
    })

    const accessToken = data.access_token

    return accessToken
  } catch (error) {
    console.error('Error getting Kinde access token:', error)
    throw new Error('Error getting Kinde Management API Access Token')
  }
})

export const updateKindeUserProperties = async (userId: string, userProperties: Record<string, any>) => {
  const accessToken = await getKindeManagementAPIAccessToken()

  try {
    const request = await fetch(`${process.env.KINDE_ISSUER_URL}/api/v1/users/${userId}/properties`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        properties: userProperties
      })
    })

    await refreshKindeUserClaimsAndInvalidateCache(userId, accessToken)

    return request.status
  } catch (error) {
    console.error('Error updating user in kinde:', error)
    throw new Error('Error updating user in kinde')
  }
}

export const refreshKindeUserClaimsAndInvalidateCache = async (userId: string, accessToken?: string) => {
  // 1. Check if the access token is provided, if not get a new one
  if (!accessToken) {
    accessToken = await getKindeManagementAPIAccessToken()
  }

  // 2. Refresh the user claims and invalidate the cache
  try {
    const request = await fetch(`${process.env.KINDE_ISSUER_URL}/api/v1/users/${userId}/refresh_claims`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return request.status
  } catch (error) {
    console.error('Error refreshing user claims in kinde:', error)
    throw new Error('Error refreshing user claims in kinde')
  }
}