'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  // If no client ID configured, render children without the provider
  if (!clientId) return <>{children}</>
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  )
}
