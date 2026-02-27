import React from 'react'
import type { Metadata } from 'next'
import '../global.css'
import { ReactQueryClientProvider } from '@/providers/react-query-client-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Tu Bolívar Hoy - Panel de usuario',
  description:
    'Observa el tipo de cambio de referencia cómodamente desde tu móvil.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={`antialiased`}>
        <ReactQueryClientProvider>
          {children}
          <Toaster />
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
