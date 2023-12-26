import React, { ReactNode } from 'react'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { getProfile } from '@/lib/profile'
import { db } from '@/lib/db'

interface Props {
  params: { id: string }
  children: ReactNode
}

export default async function Layout({ children, params: { id } }: Props) {
  const profile = await getProfile()
  if (!profile) return redirectToSignIn()

  const server = await db.server.findUnique({
    where: { id: String(id), members: { some: { profileId: profile.id } } },
  })
  if (!server) return redirect('/')

  return (
    <div className='h-full'>
      <div className='fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex'>
        Channels
      </div>
      <section className='h-full md:pl-60'>{children}</section>
    </div>
  )
}
