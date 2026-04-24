'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = ['Work', 'Services', 'Studio', 'Journal']

export default function Header({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--nav-height)',
        background: dark ? 'var(--color-abyss)' : '#fff',
        borderBottom: `1px solid ${
          dark ? 'var(--border-dark)' : scrolled ? 'var(--border-light)' : 'transparent'
        }`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        transition: 'border-color var(--t-fast)',
      }}
    >
      {/* Wordmark */}
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: '-0.02em',
          color: dark ? '#fff' : 'var(--color-ink)',
        }}
      >
        Unit
      </span>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 28 }}>
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              color: 'var(--color-gray)',
              transition: 'color var(--t-fast)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = dark ? '#fff' : 'var(--color-ink)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'var(--color-gray)')
            }
          >
            {link}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 13,
          padding: '7px 16px',
          background: dark ? '#fff' : 'var(--color-ink)',
          color: dark ? 'var(--color-abyss)' : '#fff',
          border: `1px solid ${dark ? '#fff' : 'var(--color-ink)'}`,
          borderRadius: 0,
          transition: 'opacity var(--t-fast)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        Get in touch
      </button>
    </nav>
  )
}
