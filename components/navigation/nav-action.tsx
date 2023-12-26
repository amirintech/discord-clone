'use client'

import { Plus } from 'lucide-react'

import ActionTooltip from './action-tooltip'
import { useModal } from '@/hooks/use-modal'

export default function NavAction() {
  const { onOpen } = useModal()

  return (
    <div>
      <ActionTooltip
        side='right'
        align='center'
        label='Create a server'
      >
        <div
          role='button'
          onClick={() => onOpen('createServer')}
          aria-label='create a server'
          className='group flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-background transition-all hover:rounded-[16px]  hover:bg-emerald-500 dark:bg-neutral-700'
        >
          <Plus
            className='text-emerald-500 transition group-hover:text-white'
            size={25}
          />
        </div>
      </ActionTooltip>
    </div>
  )
}
