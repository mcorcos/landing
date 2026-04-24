import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UNIT',
  description: 'UNIT — ideas built into products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
