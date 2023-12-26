import { redirect } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'

import { getProfile } from '@/lib/profile'
import { db } from '@/lib/db'
import NavAction from './nav-action'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import NavItem from './nav-item'
import ModeToggle from '../shared/mode-toggle'

export default async function Sidebar() {
  const profile = await getProfile()
  if (!profile) return redirect('/')

  const servers = await db.server.findMany({
    where: { members: { some: { profileId: profile.id } } },
  })

  return (
    <div className='flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1e1f22]'>
      <NavAction />
      <Separator className='mx-auto h-0.5 w-10 rounded-md bg-zinc-300 dark:bg-zinc-700' />

      <ScrollArea className='w-full flex-1 space-y-4'>
        {servers.map((server) => (
          <NavItem
            key={server.id}
            server={server}
          />
        ))}
      </ScrollArea>

      <div className='mt-auto flex flex-col items-center gap-y-4 pb-3'>
        <ModeToggle />
        <UserButton
          afterSignOutUrl='/'
          appearance={{ elements: { avatarBox: 'h-12 w-12' } }}
        />
      </div>
    </div>
  )
}
