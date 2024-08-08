import "server-only"

import { cookies } from "next/headers"

import type { Pioneer } from "../interfaces"

export function getPioneerFromCookie() {
  const pioneer = cookies().get('pioneer')?.value

  if (typeof pioneer === 'string') {
    return JSON.parse(pioneer) as Pioneer
  }

  return pioneer
}