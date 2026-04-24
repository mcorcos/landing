export default function HomeContent() {
  return (
    <div style={{ textAlign: 'center', animation: 'fadeIn 200ms ease-out' }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-gray)',
          marginBottom: 24,
        }}
      >
        Buenos Aires
      </p>

      <h1
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(48px, 7vw, 96px)',
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          color: 'var(--color-ink)',
          margin: '0 0 28px',
          maxWidth: 800,
        }}
      >
        Estudio de software.
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: 18,
          lineHeight: 1.6,
          color: 'var(--color-gray)',
          maxWidth: 420,
          margin: 0,
        }}
      >
        Diseñamos y construimos productos digitales.
        Precisión en cada capa.
      </p>
    </div>
  )
}
