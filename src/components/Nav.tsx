'use client'

const TABS = ['Productos', 'Studio', 'Journal']

export default function Nav() {
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
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: '-0.02em',
          color: 'var(--color-ink)',
        }}
      >
        Unit
      </span>

      {/* Center tabs */}
      <div style={{ display: 'flex', gap: 4 }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 400,
              color: 'var(--color-gray)',
              padding: '6px 14px',
              borderRadius: 0,
              transition: 'color var(--t-fast)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = 'var(--color-ink)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'var(--color-gray)')
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contact CTA */}
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
