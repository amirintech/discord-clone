import { NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

import { getProfile } from '@/lib/profile'
import { db } from '@/lib/db'
import { MemberRole } from '@prisma/client'

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json()
    const profile = await getProfile()
    if (!profile) return new NextResponse('Unauthorized', { status: 401 })

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuid(),
        channels: {
          create: [{ name: 'general', profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    })

    return NextResponse.json(server, { status: 201 })
  } catch (e) {
    console.error('API-SERVER-POST: ', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}
