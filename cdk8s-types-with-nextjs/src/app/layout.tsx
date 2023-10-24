import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'cdk9s types experiment',
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
