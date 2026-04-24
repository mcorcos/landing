import type { Metadata } from 'next'
import { DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import GoogleProvider from '@/components/GoogleProvider'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Unit — Software studio',
  description: 'We design and build digital products. Precision at every layer — from concept to code.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        <GoogleProvider>{children}</GoogleProvider>
      </body>
    </html>
  )
}
