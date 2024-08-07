'use client'

import { Pioneer } from "../../interfaces"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs"

export default function ProfileSection({ pioneer }: { pioneer: Pioneer }) {
  const year = pioneer.createdAt.getFullYear()
  const month = pioneer.createdAt.getMonth() + 1
  const day = pioneer.createdAt.getDate()
  const createdAt = `${month}/${day}/${year}`

  return (
    <section className="w-full lg:w-2/5 h-full flex flex-1 flex-col items-start justify-center p-8 bg-main-bg">
      <h1 className="w-full text-left text-2xl"> Profile</h1>
      <p className="w-full mb-4 text-left text-sm text-gray-300">Update your profile</p>
      <div className="w-full flex flex-col mb-4">
        <p>Name: {pioneer.name}</p>
        <p>Email: {pioneer.email}</p>
        <p>Created At: {createdAt}</p>
      </div>
      <LogoutLink
        className='w-1/2 lg:w-48 h-10 flex items-center justify-center bg-red-600 cursor-pointer hover:bg-red-500'
      >
        <p className='user-select-none'>Logout</p>
      </LogoutLink>
    </section>
  )
}