import React from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/organisms/Navbar'
import Footer from '@/components/organisms/Footer'
import './global.css'
import { ReactQueryClientProvider } from '@/providers/react-query-client-provider'
import Script from 'next/script'

export const metadata: Metadata = {
  title:
    'Tu Bolívar Hoy - Observa el tipo de cambio de referencia cómodamente desde tu móvil.',
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
          <Navbar />
          {children}
          <Footer />
        </ReactQueryClientProvider>
      </body>
      <Script
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5292679352028725'
        strategy='beforeInteractive'
        async={true}
        crossOrigin='anonymous'
      />
    </html>
  )
}
