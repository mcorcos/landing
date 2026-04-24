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

export default function WorkContent({ dark = false }: { dark?: boolean }) {
  const border = dark ? '1px solid #1F2A3A' : '1px solid var(--border-light)'

  return (
    <div style={{ width: '100%', maxWidth: 560, textAlign: 'left' }}>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#8A8A87',
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
              borderTop: i === 0 ? border : undefined,
              borderBottom: border,
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
                  color: dark ? '#fff' : 'var(--color-ink)',
                }}
              >
                {p.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  color: '#8A8A87',
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
                color: '#8A8A87',
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
