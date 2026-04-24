'use client'

import { useState, useEffect, useRef } from 'react'
import WorkContent from './WorkContent'
import StudioContent from './StudioContent'

export type Tab = null | 'Work' | 'Studio'

const TABS: Tab[] = ['Work', 'Studio']

// Ascending dot grid canvas animation
function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const spacing = 48
    let W = window.innerWidth
    let H = window.innerHeight

    type Dot = { x: number; y: number; speed: number; opacity: number }
    let dots: Dot[] = []

    function buildDots() {
      dots = []
      const cols = Math.ceil(W / spacing) + 1
      const rows = Math.ceil(H / spacing) + 2
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push({
            x: c * spacing,
            y: Math.random() * H, // stagger start so they don't all move in sync
            speed: 0.2 + Math.random() * 0.4,
            opacity: 0.08 + Math.random() * 0.18,
          })
        }
      }
    }

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
      buildDots()
    }

    resize()

    let animId: number
    function draw() {
      ctx.clearRect(0, 0, W, H)
      for (const d of dots) {
        d.y -= d.speed
        if (d.y < -spacing) d.y = H + spacing

        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${d.opacity})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

export default function Landing() {
  const [active, setActive] = useState<Tab>(null)

  return (
    <div
      style={{
        height: '100vh',
        overflow: 'hidden',
        background: '#0A1628',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <DotBackground />

      {/* Nav */}
      <nav
        style={{
          position: 'relative',
          zIndex: 10,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          borderBottom: '1px solid #1F2A3A',
          flexShrink: 0,
        }}
      >
        {/* UNIT wordmark */}
        <button
          onClick={() => setActive(null)}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '0.08em',
            color: '#fff',
            transition: 'opacity 150ms ease-out',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          UNIT
        </button>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(active === tab ? null : tab)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: active === tab ? 700 : 400,
                color: active === tab ? '#fff' : '#8A8A87',
                padding: '6px 14px',
                borderBottom: active === tab
                  ? '1px solid rgba(255,255,255,0.4)'
                  : '1px solid transparent',
                transition: 'color 150ms ease-out, border-color 150ms ease-out',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  active === tab ? '#fff' : '#8A8A87'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Contact */}
        <button
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 13,
            padding: '7px 18px',
            background: '#fff',
            color: '#0A1628',
            border: '1px solid #fff',
            borderRadius: 0,
            transition: 'opacity 150ms ease-out',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Contact
        </button>
      </nav>

      {/* Main content */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        {active === null && (
          <div style={{ animation: 'fadeUp 300ms ease-out' }}>
            <style>{`
              @keyframes fadeUp {
                from { opacity: 0; transform: translateY(12px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* Logo */}
            <img
              src="/logo-dark.jpeg"
              alt="Unit"
              style={{
                height: 52,
                width: 'auto',
                display: 'block',
                margin: '0 auto 40px',
              }}
            />

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(32px, 4.5vw, 64px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#fff',
                margin: '0 0 24px',
                maxWidth: 680,
              }}
            >
              Estudio de software.<br />
              Llevamos adelante tus proyectos.
            </h1>

            {/* Subline */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#8A8A87',
                margin: 0,
              }}
            >
              Buenos Aires — 2025
            </p>
          </div>
        )}

        {active === 'Work' && (
          <div style={{ animation: 'fadeUp 200ms ease-out' }}>
            <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <WorkContent dark />
          </div>
        )}

        {active === 'Studio' && (
          <div style={{ animation: 'fadeUp 200ms ease-out' }}>
            <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <StudioContent dark />
          </div>
        )}
      </main>
    </div>
  )
}
