import React from 'react'
import { Geist, Geist_Mono, Inter, Roboto_Flex } from 'next/font/google'
import type { Metadata } from 'next'
import '../global.css'
import { ReactQueryClientProvider } from '@/providers/react-query-client-provider'
import { Toaster } from '@/components/ui/sonner'
import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Home - Tu Bolívar Hoy',
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
      <body
        className={`${interFont.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryClientProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
                <div className='flex items-center gap-2 px-4'>
                  <SidebarTrigger className='-ml-1' />
                  <Separator
                    orientation='vertical'
                    className='mr-2 data-[orientation=vertical]:h-4'
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className='hidden md:block'>
                        <BreadcrumbLink href='#'>
                          Build Your Application
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className='hidden md:block' />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ReactQueryClientProvider>
        <Toaster />
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
