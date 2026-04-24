'use client'

import { useState, useRef, useEffect } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const PHRASES = [
  'Quiero crear un sistema de turnos para mi clínica.',
  'Quiero un sistema de envíos para mi heladería.',
  'Necesito gestionar los clientes de mi estudio de abogados.',
  'Quiero una app de reservas para mi restaurante.',
  'Necesito digitalizar el inventario de mi ferretería.',
  'Quiero un portal para que mis clientes paguen online.',
  'Necesito una plataforma de cursos para mi academia.',
  'Quiero automatizar la facturación de mi empresa.',
  'Necesito un sistema de delivery para mi panadería.',
  'Quiero un CRM para mi equipo de ventas.',
  'Necesito rastrear pedidos en mi e-commerce.',
  'Quiero gestionar mis propiedades desde una plataforma.',
  'Quiero automatizar las cotizaciones de mi constructora.',
  'Necesito control de asistencia para mi empresa.',
  'Quiero coordinar mi equipo de trabajo desde una app.',
  'Necesito un portal de autogestión para mis clientes.',
  'Quiero digitalizar los legajos de mis empleados.',
  'Necesito un sistema de reservas para mi spa.',
  'Quiero monitorear mi flota de vehículos en tiempo real.',
  'Necesito integrar mi tienda con MercadoLibre.',
  'Quiero un dashboard de métricas para mi negocio.',
  'Necesito una app interna para mi equipo de soporte.',
  'Quiero gestionar obras y presupuestos desde una sola app.',
  'Necesito automatizar los reportes de mi contabilidad.',
  'Quiero una plataforma de fidelización para mis clientes.',
]

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export default function ContactForm() {
  const [message, setMessage] = useState('')
  const [animText, setAnimText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)
  const cancelRef = useRef(false)

  // Typewriter animation
  useEffect(() => {
    if (isFocused || message) return
    cancelRef.current = false

    const run = async () => {
      let i = 0
      while (!cancelRef.current) {
        const phrase = PHRASES[i % PHRASES.length]
        i++
        // Type
        for (let c = 0; c <= phrase.length; c++) {
          if (cancelRef.current) return
          setAnimText(phrase.slice(0, c))
          await sleep(32)
        }
        await sleep(1800)
        // Erase
        for (let c = phrase.length; c >= 0; c--) {
          if (cancelRef.current) return
          setAnimText(phrase.slice(0, c))
          await sleep(16)
        }
        await sleep(350)
      }
    }

    run()
    return () => { cancelRef.current = true }
  }, [isFocused, message])

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor(v => !v), 530)
    return () => clearInterval(id)
  }, [])

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
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId) {
      const email = window.prompt('Ingresá tu email para que podamos responderte:')
      if (!email) { setStatus('idle'); return }
      await sendMessage(email, '')
      return
    }
    try {
      const win = window as Window & {
        google?: { accounts: { oauth2: { initTokenClient: (cfg: unknown) => { requestAccessToken: () => void } } } }
      }
      const tokenClient = win.google?.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'email profile',
        callback: async (response: { access_token?: string; error?: string }) => {
          if (response.error || !response.access_token) { setStatus('error'); return }
          const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }).then(r => r.json())
          await sendMessage(userInfo.email, userInfo.name)
        },
      })
      tokenClient?.requestAccessToken()
    } catch { setStatus('error') }
  }

  const toggleMic = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) { alert('Tu navegador no soporta reconocimiento de voz.'); return }
    if (isRecording) { recognitionRef.current?.stop(); setIsRecording(false); return }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rec = new SR() as any
    rec.lang = 'es-AR'
    rec.continuous = false
    rec.interimResults = false
    rec.onresult = (e: { results: { [k: number]: { [k: number]: { transcript: string } } } }) => {
      setMessage(prev => prev ? prev + ' ' + e.results[0][0].transcript : e.results[0][0].transcript)
    }
    rec.onend = () => setIsRecording(false)
    rec.onerror = () => setIsRecording(false)
    recognitionRef.current = rec
    rec.start()
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
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6, color: '#8A8A87', margin: '0 auto 32px', maxWidth: 480 }}>
        Describinos tu idea, necesidad o negocio y te damos una respuesta en un día. Agendamos una reunión.
      </p>

      {/* Chat box */}
      <div style={{
        background: 'rgba(15, 30, 53, 0.75)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 28,
        padding: '20px 16px 14px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
      }}>
        {/* Animated placeholder overlay */}
        {!message && !isFocused && (
          <div style={{
            position: 'absolute',
            top: 20,
            left: 24,
            right: 16,
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.35)',
            pointerEvents: 'none',
            textAlign: 'left',
          }}>
            {animText}
            <span style={{ opacity: showCursor ? 1 : 0, borderRight: '1.5px solid rgba(255,255,255,0.5)', marginLeft: 1 }}>&nbsp;</span>
          </div>
        )}

        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
          rows={4}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            lineHeight: 1.6,
            color: '#fff',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            width: '100%',
            caretColor: '#fff',
          }}
        />

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>

          <button onClick={toggleMic} title="Dictá tu mensaje" style={{
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
            background: isRecording ? 'rgba(255,80,80,0.2)' : 'rgba(255,255,255,0.08)',
            border: '1px solid', borderColor: isRecording ? 'rgba(255,80,80,0.6)' : 'rgba(255,255,255,0.15)',
            color: isRecording ? '#ff6060' : '#8A8A87',
            transition: 'all 150ms ease-out',
            animation: isRecording ? 'pulse 1s ease-in-out infinite' : 'none',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="22"/>
            </svg>
          </button>

          <button onClick={handleSubmit} disabled={!message.trim() || status === 'loading'} style={{
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
            background: message.trim() ? '#fff' : 'rgba(255,255,255,0.1)',
            border: 'none',
            color: message.trim() ? '#0F1E35' : '#8A8A87',
            transition: 'all 150ms ease-out',
            cursor: message.trim() ? 'pointer' : 'default',
          }}
            onMouseEnter={e => { if (message.trim()) e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            {status === 'loading'
              ? <span style={{ fontSize: 11 }}>...</span>
              : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
                </svg>
            }
          </button>
        </div>
      </div>

      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#ff5050', marginTop: 10, letterSpacing: '0.06em' }}>
          Algo salió mal. Intentá de nuevo.
        </p>
      )}
    </div>
  )
}
