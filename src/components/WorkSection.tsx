import CaseStudyCard from './CaseStudyCard'

const PROJECTS = [
  {
    index: '01',
    tag: 'Product',
    title: 'EdifiQ',
    body: 'Real estate intelligence terminal for Buenos Aires. Market data, transactions, and analytics — Bloomberg-style.',
    year: '2025',
    featured: true,
  },
  {
    index: '02',
    tag: 'Platform',
    title: 'MatchPoint',
    body: 'Sports platform for padel, tennis, football, and squash. Booking, rankings, and community in one place.',
    year: '2025',
    featured: false,
  },
  {
    index: '03',
    tag: 'App',
    title: 'Recomiendo',
    body: 'Restaurant discovery and reviews. Honest opinions from people you trust.',
    year: '2025',
    featured: false,
  },
]

export default function WorkSection() {
  return (
    <section
      style={{
        background: '#fff',
        padding: '96px 40px',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 48,
            paddingBottom: 24,
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-gray)',
                marginBottom: 12,
              }}
            >
              Selected work
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3vw, 48px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--color-ink)',
                margin: 0,
              }}
            >
              Products we build.
            </h2>
          </div>
          <button
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 13,
              color: 'var(--color-gray)',
              transition: 'color var(--t-fast)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = 'var(--color-ink)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'var(--color-gray)')
            }
          >
            All projects →
          </button>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 1,
            border: '1px solid var(--border-light)',
          }}
        >
          {PROJECTS.map((p) => (
            <CaseStudyCard key={p.index} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
