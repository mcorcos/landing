const PROJECTS = [
  {
    name: 'EdifiQ',
    description: 'Terminal de inteligencia inmobiliaria para Buenos Aires.',
    status: 'En desarrollo',
  },
  {
    name: 'MatchPoint',
    description: 'Plataforma deportiva para pádel, tenis y fútbol.',
    status: 'En desarrollo',
  },
  {
    name: 'Recomiendo',
    description: 'Reviews de restaurantes de gente que conoce.',
    status: 'En desarrollo',
  },
]

export default function WorkContent() {
  return (
    <div style={{ animation: 'fadeIn 200ms ease-out', width: '100%', maxWidth: 560 }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-gray)',
          marginBottom: 32,
        }}
      >
        Productos
      </p>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {PROJECTS.map((p, i) => (
          <div
            key={p.name}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              padding: '20px 0',
              borderTop: i === 0 ? '1px solid var(--border-light)' : undefined,
              borderBottom: '1px solid var(--border-light)',
              gap: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-ink)',
                }}
              >
                {p.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  color: 'var(--color-gray)',
                  lineHeight: 1.5,
                }}
              >
                {p.description}
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-gray)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
