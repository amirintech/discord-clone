import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen items-center justify-center'>{children}</div>
  )
}
