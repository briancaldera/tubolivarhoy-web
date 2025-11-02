import React from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/organisms/Navbar'
import Footer from '@/components/organisms/Footer'
import './global.css'

export const metadata: Metadata = {
  title:
    'Tu Bolívar Hoy - Plataforma para la gestión de historias clínicas de la Facultad de Odontología de la UGMA',
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
