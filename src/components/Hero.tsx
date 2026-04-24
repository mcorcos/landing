export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 40px',
        borderBottom: '1px solid var(--border-light)',
        position: 'relative',
        background: '#fff',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--content-max)',
          margin: '0 auto',
          width: '100%',
          paddingTop: 'var(--nav-height)',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-gray)',
            marginBottom: 32,
          }}
        >
          Software studio · Buenos Aires
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(48px, 6vw, 88px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
            maxWidth: 820,
            marginBottom: 32,
            margin: '0 0 32px',
          }}
        >
          Design and build<br />digital products.
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.6,
            color: 'var(--color-gray)',
            maxWidth: 480,
            marginBottom: 48,
            margin: '0 0 48px',
          }}
        >
          Precision at every layer — from concept to code. We partner with founders and teams to ship software that earns trust.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 14,
              padding: '11px 24px',
              background: 'var(--color-ink)',
              color: '#fff',
              border: '1px solid var(--color-ink)',
              borderRadius: 0,
              transition: 'opacity var(--t-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            View our work →
          </button>
          <button
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 14,
              padding: '11px 24px',
              background: 'transparent',
              color: 'var(--color-ink)',
              border: '1px solid var(--border-light)',
              borderRadius: 0,
              transition: 'border-color var(--t-fast)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = 'var(--color-ink)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = 'var(--border-light)')
            }
          >
            Get in touch
          </button>
        </div>
      </div>

      {/* Bottom meta bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 40,
          right: 40,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-gray)',
          }}
        >
          Unit Studio
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-gray)',
          }}
        >
          2025 — ongoing
        </span>
      </div>
    </section>
  )
}
