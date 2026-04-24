'use client'

import type { Tab } from './Landing'

const TABS: Tab[] = ['Work', 'Studio']

interface NavProps {
  active: Tab
  onTabChange: (tab: Tab) => void
}

export default function Nav({ active, onTabChange }: NavProps) {
  return (
    <nav
      style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        borderBottom: '1px solid var(--border-light)',
        flexShrink: 0,
      }}
    >
      {/* Wordmark */}
      <button
        onClick={() => onTabChange(null)}
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: '-0.02em',
          color: 'var(--color-ink)',
          transition: 'opacity var(--t-fast)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        Unit
      </button>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4 }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(active === tab ? null : tab)}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: active === tab ? 700 : 400,
              color: active === tab ? 'var(--color-ink)' : 'var(--color-gray)',
              padding: '6px 14px',
              borderBottom: active === tab ? '1px solid var(--color-ink)' : '1px solid transparent',
              transition: 'color var(--t-fast), border-color var(--t-fast)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = 'var(--color-ink)')
            }
            onMouseLeave={(e) => {
              e.currentTarget.style.color =
                active === tab ? 'var(--color-ink)' : 'var(--color-gray)'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contact */}
      <button
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 13,
          padding: '7px 18px',
          background: 'var(--color-ink)',
          color: '#fff',
          border: '1px solid var(--color-ink)',
          borderRadius: 0,
          transition: 'opacity var(--t-fast)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        Contact
      </button>
    </nav>
  )
}
