'use client'

import { useState, useEffect, useRef } from 'react'
import WorkContent from './WorkContent'
import StudioContent from './StudioContent'
import ContactForm from './ContactForm'

export type Tab = null | 'Work' | 'Studio' | 'Contact'

const TABS: Tab[] = ['Work', 'Studio']

// Ascending dot grid with mouse repulsion physics
function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const SPACING = 52
    const REPULSION_RADIUS = 130  // px — campo de influencia del mouse
    const REPULSION_FORCE = 6     // fuerza de empuje
    const SPRING = 0.06           // velocidad de retorno al home
    const DAMPING = 0.78          // fricción

    let W = window.innerWidth
    let H = window.innerHeight

    type Dot = {
      homeX: number   // columna fija en la grilla
      homeY: number   // fila "home" que sube continuamente
      x: number       // posición real (afectada por mouse)
      y: number
      vx: number      // velocidad
      vy: number
      ascendSpeed: number
      opacity: number
    }

    let dots: Dot[] = []

    function buildDots() {
      dots = []
      const cols = Math.ceil(W / SPACING) + 1
      const rows = Math.ceil(H / SPACING) + 2
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * SPACING
          const y = Math.random() * H
          dots.push({
            homeX: x,
            homeY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            ascendSpeed: 0.25 + Math.random() * 0.35,
            opacity: 0.18 + Math.random() * 0.32,
          })
        }
      }
    }

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      if (!canvas) return
      canvas.width = W
      canvas.height = H
      buildDots()
    }

    resize()

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    let animId: number
    function draw() {
      ctx.clearRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const d of dots) {
        // Home sube continuamente
        d.homeY -= d.ascendSpeed
        if (d.homeY < -SPACING) d.homeY = H + SPACING

        // Repulsión del mouse (campo electromagnético)
        const dx = d.x - mx
        const dy = d.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPULSION_RADIUS && dist > 0) {
          const t = 1 - dist / REPULSION_RADIUS           // 0→1 según cercanía
          const force = t * t * REPULSION_FORCE            // cuadrático: más fuerte en el centro
          d.vx += (dx / dist) * force
          d.vy += (dy / dist) * force
        }

        // Spring de retorno al home
        d.vx += (d.homeX - d.x) * SPRING
        d.vy += (d.homeY - d.y) * SPRING

        // Damping + aplicar velocidad
        d.vx *= DAMPING
        d.vy *= DAMPING
        d.x += d.vx
        d.y += d.vy

        // Opacidad mayor cuando está cerca del mouse (efecto de iluminación)
        const proximity = dist < REPULSION_RADIUS ? 1 - dist / REPULSION_RADIUS : 0
        const alpha = d.opacity + proximity * 0.4

        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.5 + proximity * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.min(alpha, 0.9)})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
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
        background: '#0F1E35',
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
          onClick={() => setActive(active === 'Contact' ? null : 'Contact')}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 13,
            padding: '7px 18px',
            background: active === 'Contact' ? 'transparent' : '#fff',
            color: active === 'Contact' ? '#fff' : '#0A1628',
            border: '1px solid #fff',
            borderRadius: 0,
            transition: 'opacity 150ms ease-out, background 150ms ease-out',
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
          <div style={{ animation: 'fadeUp 600ms cubic-bezier(0.16,1,0.3,1)' }}>
            <style>{`
              @keyframes fadeUp {
                from { opacity: 0; transform: translateY(12px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* Logo */}
            <img
              src="/logo-light.jpeg"
              alt="Unit"
              style={{
                height: 200,
                width: 'auto',
                display: 'block',
                margin: '0 auto 48px',
                borderRadius: 24,
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

        {active === 'Contact' && (
          <div style={{ animation: 'fadeUp 600ms cubic-bezier(0.16,1,0.3,1)', width: '100%', maxWidth: 640 }}>
            <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(24px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>
            <ContactForm />
          </div>
        )}
      </main>
    </div>
  )
}
