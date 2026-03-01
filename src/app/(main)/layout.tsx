import React from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/organisms/Navbar'
import Footer from '@/components/organisms/Footer'
import '../global.css'
import { ReactQueryClientProvider } from '@/providers/react-query-client-provider'
import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'
import { Geist, Geist_Mono, Inter, Roboto_Flex } from 'next/font/google'

export const metadata: Metadata = {
  title:
    'Tu Bolívar Hoy - Observa el tipo de cambio de referencia cómodamente desde tu móvil.',
  description:
    'Observa el tipo de cambio de referencia cómodamente desde tu móvil.',
  generator: 'Next.js',
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const robotoFont = Roboto_Flex({
  variable: '--font-roboto',
  subsets: ['latin'],
})

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
          <Toaster />
        </ReactQueryClientProvider>
        <Script
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5292679352028725'
          async={true}
          crossOrigin='anonymous'
        />
        <Script
          src='https://accounts.google.com/gsi/client'
          async={true}
          referrerPolicy={
            process.env.NODE_ENV === 'production'
              ? 'strict-origin-when-cross-origin'
              : 'no-referrer-when-downgrade'
          }
        />
      </body>
    </html>
  )
}
