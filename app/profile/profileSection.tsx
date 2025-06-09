'use client'

import { Pioneer } from "../../interfaces"

export default function ProfileSection({ pioneer }: { pioneer: Pioneer }) {
  const year = pioneer.createdAt.getFullYear()
  const month = pioneer.createdAt.getMonth() + 1
  const day = pioneer.createdAt.getDate()
  const createdAt = `${day}/${month}/${year}`

  return (
    <section className="w-full h-full flex flex-col flex-grow items-start p-8 bg-main-bg">
      <h1 className="w-full text-left text-2xl mb-4">Profile</h1>
      <div className="w-full h-full flex flex-col justify-center">
        <div className="w-full flex flex-col mb-4">
          <p>Name: {pioneer.name}</p>
          <p>Email: {pioneer.email}</p>
          <p>Created At: {createdAt}</p>
        </div>
      </div>
    </section>
  )
}