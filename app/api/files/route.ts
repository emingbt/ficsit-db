import { NextRequest, NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { createFileRecord } from '../../../services/file'
import { getPioneerByEmail } from '../../../services/pioneer'

// POST /api/files
export async function POST(req: NextRequest) {
  try {
    // Check if the request is authenticated
    const { isAuthenticated, getUser } = getKindeServerSession()
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const user = await getUser()
    if (!user || !user.email) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 })
    }
    const pioneer = await getPioneerByEmail(user.email)
    if (!pioneer) {
      return NextResponse.json({ error: 'Pioneer not found' }, { status: 400 })
    }

    // Parse the request body
    const body = await req.json()
    const { url, type, size } = body
    if (!url || !type || !size) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Use the file service to create the record
    const file = await createFileRecord({ pioneerId: pioneer.id, url, type, size })
    return NextResponse.json({ file })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
