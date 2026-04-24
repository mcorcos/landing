'use client'

import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info (email) from Google
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then((r) => r.json())

        // Send to our API route
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userInfo.email, name: userInfo.name, message }),
        })

        if (res.ok) {
          setStatus('success')
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    },
    onError: () => setStatus('error'),
  })

  const handleSubmit = () => {
    if (!message.trim()) return
    setStatus('loading')
    login()
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#8A8A87',
          marginBottom: 12,
        }}>
          Mensaje enviado
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 18,
          color: '#fff',
          fontWeight: 700,
        }}>
          Te contactamos pronto.
        </p>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 520 }}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Preguntanos lo que sea."
        rows={6}
        style={{
          width: '100%',
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          color: '#1A1A1A',
          background: '#F2F2F0',
          border: 'none',
          borderRadius: 0,
          padding: '20px 24px',
          outline: 'none',
          resize: 'none',
          display: 'block',
          lineHeight: 1.6,
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        {status === 'error' && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: '#8A8A87',
            letterSpacing: '0.08em',
          }}>
            Algo salió mal. Intentá de nuevo.
          </span>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <button
            onClick={handleSubmit}
            disabled={status === 'loading' || !message.trim()}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 13,
              padding: '11px 28px',
              background: message.trim() ? '#fff' : 'rgba(255,255,255,0.2)',
              color: message.trim() ? '#0A1628' : '#8A8A87',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 0,
              cursor: message.trim() ? 'pointer' : 'default',
              transition: 'all 150ms ease-out',
            }}
            onMouseEnter={(e) => { if (message.trim()) e.currentTarget.style.opacity = '0.8' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            {status === 'loading' ? 'Abriendo Google...' : 'Enviar →'}
          </button>
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: '#8A8A87',
        letterSpacing: '0.06em',
        marginTop: 10,
        textAlign: 'right',
      }}>
        Te pedimos el mail via Google para responderte.
      </p>
    </div>
  )
}
