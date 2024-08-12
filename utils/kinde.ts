import type { KindeAccessToken, KindeIdToken } from "@kinde-oss/kinde-auth-nextjs/dist/types"

interface PioneerProperties {
  name: string,
  avatar: string,
  color: string,
}

export function getPropertiesFromAccessToken(accessToken?: KindeAccessToken) {
  if (!accessToken) {
    return undefined
  }

  // @ts-ignore
  const properties = accessToken?.user_properties

  if (!properties) {
    return undefined
  }

  const pioneerProperties = {
    name: properties?.name?.v || "",
    avatar: properties?.avatar?.v || "",
    color: properties?.color?.v || "",
  } as PioneerProperties

  return pioneerProperties
}