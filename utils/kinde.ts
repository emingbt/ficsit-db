import type { KindeIdToken } from "@kinde-oss/kinde-auth-nextjs/dist/types"

interface PioneerProperties {
  name: string,
  avatar: string,
  color: string,
}

export function getPropertiesFromIdToken(idToken?: KindeIdToken) {
  if (!idToken) {
    return undefined
  }

  // @ts-ignore
  const properties = idToken?.user_properties

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