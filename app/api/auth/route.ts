import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { getPioneerByEmail } from "../../../services/pioneer"

export async function GET(req: Request) {
  // 1. Check if the user is authenticated
  const { getUser, isAuthenticated } = getKindeServerSession()
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return redirect('/')
  }

  const user = await getUser()

  if (!user || !user.email) {
    return redirect('/')
  }

  // 2. Check if the user is already a pioneer
  const existingPioneer = await getPioneerByEmail(user.email)

  // 3.1. If the user is not a pioneer, redirect to the create pioneer page
  if (!existingPioneer) {
    return redirect('/create-pioneer')
  }

  // 3.2. If the user is a pioneer, redirect to the home page
  return redirect('/')
}