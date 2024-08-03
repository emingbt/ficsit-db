import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { getPioneerByEmail } from "../../../services/auth"
import { cookies } from "next/headers"

export async function GET(req: Request) {
  // 1. Check if the user is authenticated
  const { getUser, isAuthenticated } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return redirect('/login')
  }

  const user = await getUser()

  if (!user || !user.email) {
    return redirect('/login')
  }

  // 2. Check if the user is already a pioneer
  const existingPioneer = await getPioneerByEmail(user.email)

  // 3.1. If the user is not a pioneer, redirect to the create pioneer page
  if (!existingPioneer) {
    return redirect('/create-pioneer')
  }

  // 3.2. If the user is a pioneer, set cookies and redirect to the home page
  const { name, avatar, color } = existingPioneer

  cookies().set('pioneer', JSON.stringify({ name, avatar, color }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })

  return redirect('/')
}