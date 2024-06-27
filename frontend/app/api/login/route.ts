import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  console.log('GET request')
  return new Response('Hello from the backend!')
}

export async function POST(req: Request) {
  console.log('POST request started')
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  console.log('token', token)

  const { email, password } = await req.json()
  console.log(email, password)

  const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      getSetCookie: 'true'
    },
    body: JSON.stringify({ email, password })
  })

  const body = await response.json()

  console.log('response', response, "body", body)

  // const data = await response.json()
  // console.log('data', data)


  return NextResponse.json(body)
}