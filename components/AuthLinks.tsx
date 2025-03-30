"use client"

import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"

export default function AuthLinks() {
  return (
    <div className="flex flex-row gap-4 text-sm lg:text-base font-secondary">
      <LoginLink
        className="w-1/2 max-w-[16rem] h-8 lg:h-10 flex items-center justify-center bg-light-bg lg:hover:bg-main-orange text-light-orange lg:hover:text-white rounded-sm"
        postLoginRedirectURL='/api/auth'
      >
        Login
      </LoginLink>
      <RegisterLink
        className="w-1/2 max-w-[16rem] h-8 lg:h-10 flex items-center justify-center bg-light-bg lg:hover:bg-main-orange text-light-orange lg:hover:text-white rounded-sm"
        postLoginRedirectURL='/api/auth'
      >
        Sign up
      </RegisterLink>
    </div>
  )
}