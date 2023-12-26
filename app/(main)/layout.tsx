import Sidebar from '@/components/navigation/sidebar'
import React, { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='h-full'>
      <div className='fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex'>
        <Sidebar />
      </div>

      <main className='h-full md:ml-[72px]'>{children}</main>
    </div>
  )
}
