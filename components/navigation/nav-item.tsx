'use client'

import Image from 'next/image'
import { Server } from '@prisma/client'
import ActionTooltip from './action-tooltip'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'

interface Props {
  server: Server
}

export default function NavItem({ server: { id, imageUrl, name } }: Props) {
  const params = useParams()

  return (
    <ActionTooltip
      side='right'
      align='center'
      label={name}
    >
      <Link
        aria-label={`${name} server`}
        href={'/server/' + id}
        className='group relative flex items-center'
      >
        <div
          className={cn(
            'absolute left-0 w-1 rounded-full bg-primary transition-all',
            params.serverId != id ? 'h-2 group-hover:h-[20px]' : 'h-[36px]',
          )}
        />
        <div
          className={cn(
            'relative mx-3 flex h-12 w-12 overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]',
            params.serverId == id &&
              'rounded-[16px] bg-primary/10 text-primary',
          )}
        >
          <Image
            fill
            src={imageUrl}
            alt={`${name} server`}
            className='object-cover'
          />
        </div>
      </Link>
    </ActionTooltip>
  )
}
