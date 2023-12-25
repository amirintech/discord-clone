import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { getOrCreateProfile } from '@/lib/profile'
import InitialModal from '@/components/modals/initial-modal'

export default async function SetupPage() {
  const profile = await getOrCreateProfile()
  const server = await db.server.findFirst({
    where: { members: { some: { profileId: profile.id } } },
  })
  if (server) redirect('/server/' + server.id)

  return <InitialModal />
}
