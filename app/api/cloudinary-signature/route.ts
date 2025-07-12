import { NextRequest, NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { getPioneerByEmail } from '../../../services/pioneer'
import { getCloudinaryUploadSignature } from '../../../services/cloudinary'

// You may want to use a proper auth check here in production

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { folder = 'pending', public_id, eager, tags, transformation } = body
  const resource_type = 'image'

  // Validate required fields
  if (!folder) {
    return NextResponse.json({ error: 'Missing required fields: folder.' }, { status: 400 })
  }

  // Check if the user is authenticated
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

  try {
    const signedParams = getCloudinaryUploadSignature({ folder, public_id, resource_type, eager, tags, transformation })
    return NextResponse.json(signedParams)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate Cloudinary signature.' }, { status: 500 })
  }
}
