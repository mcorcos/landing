export default function StudioContent() {
  return (
    <div
      style={{
        animation: 'fadeIn 200ms ease-out',
        width: '100%',
        maxWidth: 520,
      }}
    >
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
        Studio
      </p>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 28,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: 'var(--color-ink)',
          marginBottom: 24,
        }}
      >
        Construimos productos propios y con quienes comparten el criterio.
      </p>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          lineHeight: 1.7,
          color: 'var(--color-gray)',
          marginBottom: 16,
        }}
      >
        Unit es un estudio de software basado en Buenos Aires. Diseñamos y desarrollamos
        aplicaciones, plataformas y herramientas — con foco en el detalle y en que las
        cosas funcionen.
      </p>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          lineHeight: 1.7,
          color: 'var(--color-gray)',
        }}
      >
        No somos una agencia. Cada producto que lanzamos es nuestro. Cuando trabajamos
        con otros, lo hacemos como si fuera propio.
      </p>
    </div>
  )
}
