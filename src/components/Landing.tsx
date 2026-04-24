'use client'

import { useState } from 'react'
import Nav from './Nav'
import HomeContent from './HomeContent'
import WorkContent from './WorkContent'
import StudioContent from './StudioContent'

export type Tab = null | 'Work' | 'Studio'

const CONTENT = {
  null: HomeContent,
  Work: WorkContent,
  Studio: StudioContent,
}

export default function Landing() {
  const [active, setActive] = useState<Tab>(null)

  const Content = CONTENT[String(active) as keyof typeof CONTENT]

  return (
    <div
      style={{
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--color-off-white)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Nav active={active} onTabChange={setActive} />
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
        }}
      >
        <Content />
      </main>
    </div>
  )
}
