'use client'

const STUDIO_LINKS = ['Work', 'Services', 'Studio', 'Journal']
const CONTACT_LINKS = ['hello@unit.build', 'LinkedIn', 'GitHub']

function FooterLink({ label }: { label: string }) {
  return (
    <button
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: 'var(--color-gray)',
        textAlign: 'left',
        transition: 'color var(--t-fast)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-gray)')}
    >
      {label}
    </button>
  )
}

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-abyss)',
        borderTop: '1px solid var(--border-dark)',
        padding: '64px 40px 40px',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {/* Top */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingBottom: 48,
            borderBottom: '1px solid var(--border-dark)',
            marginBottom: 32,
            flexWrap: 'wrap',
            gap: 48,
          }}
        >
          {/* Logo + tagline */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: '-0.02em',
                color: '#fff',
              }}
            >
              Unit
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                color: 'var(--color-gray)',
                marginTop: 8,
                lineHeight: 1.5,
              }}
            >
              Software studio.<br />From concept to code.
            </div>
          </div>

          {/* Link columns */}
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gray)',
                  marginBottom: 16,
                }}
              >
                Studio
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {STUDIO_LINKS.map((l) => <FooterLink key={l} label={l} />)}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gray)',
                  marginBottom: 16,
                }}
              >
                Contact
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {CONTACT_LINKS.map((l) => <FooterLink key={l} label={l} />)}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--color-gray)',
              letterSpacing: '0.06em',
            }}
          >
            © 2025 Unit Studio. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--color-gray)',
              letterSpacing: '0.06em',
            }}
          >
            Built with precision.
          </span>
        </div>
      </div>
    </footer>
  )
}
