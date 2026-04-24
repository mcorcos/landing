'use client'

import { useState } from 'react'

interface CaseStudyCardProps {
  index: string
  tag: string
  title: string
  body: string
  year: string
  featured?: boolean
}

export default function CaseStudyCard({
  index,
  tag,
  title,
  body,
  year,
  featured = false,
}: CaseStudyCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: featured ? 'var(--color-abyss)' : hovered ? 'var(--color-off-white)' : '#fff',
        border: `1px solid ${
          featured ? 'var(--border-dark)' : hovered ? 'var(--border-mid)' : 'var(--border-light)'
        }`,
        padding: '28px 28px 22px',
        cursor: 'pointer',
        transition: 'background var(--t-fast), border-color var(--t-fast)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: featured ? 'var(--color-steel)' : 'var(--color-gray)',
          }}
        >
          {tag}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--color-gray)',
          }}
        >
          {index}
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 20,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: featured ? '#fff' : 'var(--color-ink)',
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      {/* Body */}
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: 13,
          lineHeight: 1.6,
          color: 'var(--color-gray)',
          marginBottom: 20,
          flex: 1,
        }}
      >
        {body}
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 14,
          borderTop: `1px solid ${
            featured ? 'var(--border-dark)' : 'var(--border-light)'
          }`,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--color-gray)',
          }}
        >
          {year}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 12,
            color: 'var(--color-steel)',
          }}
        >
          View →
        </span>
      </div>
    </div>
  )
}
