'use client'

import { useState, useRef } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)

  const sendMessage = async (email: string, name: string) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, message }),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  const handleSubmit = async () => {
    if (!message.trim() || status === 'loading') return
    setStatus('loading')

    // If Google OAuth not configured, use a prompt as fallback
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId) {
      // Fallback: ask for email directly
      const email = window.prompt('Ingresá tu email para que podamos responderte:')
      if (!email) { setStatus('idle'); return }
      await sendMessage(email, '')
      return
    }

    // Google OAuth flow
    try {
      const { googleLogout, useGoogleLogin } = await import('@react-oauth/google')
      void googleLogout
      void useGoogleLogin
      // Dynamic import won't work with hooks — use Google Identity popup directly
      const tokenClient = (window as Window & {
        google?: { accounts: { oauth2: { initTokenClient: (cfg: unknown) => { requestAccessToken: () => void } } } }
      }).google?.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'email profile',
        callback: async (response: { access_token?: string; error?: string }) => {
          if (response.error || !response.access_token) { setStatus('error'); return }
          try {
            const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${response.access_token}` },
            }).then(r => r.json())
            await sendMessage(userInfo.email, userInfo.name)
          } catch { setStatus('error') }
        },
      })
      tokenClient?.requestAccessToken()
    } catch { setStatus('error') }
  }

  const toggleMic = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) { alert('Tu navegador no soporta reconocimiento de voz.'); return }

    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new SR() as any
    recognition.lang = 'es-AR'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onresult = (e: { results: { [k: number]: { [k: number]: { transcript: string } } } }) => {
      const transcript = e.results[0][0].transcript
      setMessage(prev => prev ? prev + ' ' + transcript : transcript)
    }
    recognition.onend = () => setIsRecording(false)
    recognition.onerror = () => setIsRecording(false)
    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A8A87', marginBottom: 16 }}>
          Mensaje enviado
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 24, color: '#fff', letterSpacing: '-0.02em' }}>
          Te contactamos en un día.
        </p>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 640, textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A8A87', marginBottom: 16 }}>
        Contactanos
      </p>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 12px' }}>
        ¿Cuál es tu idea?
      </h2>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6, color: '#8A8A87', margin: '0 auto 36px', maxWidth: 480 }}>
        Describinos tu idea, necesidad o negocio y te damos una respuesta en un día. Agendamos una reunión.
      </p>

      {/* Chat bar */}
      <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '4px 4px 4px 20px', gap: 8 }}>
        <input
          autoFocus
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSubmit() }}
          placeholder="Describí tu proyecto..."
          style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 15, color: '#fff', background: 'transparent', border: 'none', outline: 'none', padding: '12px 0' }}
        />

        {/* Mic */}
        <button
          onClick={toggleMic}
          title="Dictá tu mensaje"
          style={{
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isRecording ? 'rgba(255,80,80,0.15)' : 'transparent',
            border: '1px solid', borderColor: isRecording ? 'rgba(255,80,80,0.5)' : 'rgba(255,255,255,0.12)',
            color: isRecording ? '#ff5050' : '#8A8A87', flexShrink: 0, transition: 'all 150ms ease-out',
            animation: isRecording ? 'pulse 1s ease-in-out infinite' : 'none',
          }}
        >
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="22"/>
          </svg>
        </button>

        {/* Send */}
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || status === 'loading'}
          style={{
            height: 40, padding: '0 20px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 13,
            background: message.trim() ? '#fff' : 'rgba(255,255,255,0.1)',
            color: message.trim() ? '#0F1E35' : '#8A8A87',
            border: 'none', borderRadius: 0, flexShrink: 0,
            transition: 'all 150ms ease-out', cursor: message.trim() ? 'pointer' : 'default',
          }}
          onMouseEnter={e => { if (message.trim()) e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          {status === 'loading' ? '...' : 'Enviar →'}
        </button>
      </div>

      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#ff5050', marginTop: 10, letterSpacing: '0.06em' }}>
          Algo salió mal. Intentá de nuevo.
        </p>
      )}
    </div>
  )
}
