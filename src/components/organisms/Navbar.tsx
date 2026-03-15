'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { CurrentUserAvatar } from '@/components/current-user-avatar'
import { useSession } from '@/hooks/use-session'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useSession()

  return (
    <nav className='sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center'>
              <span className='from-primary-start to-primary-end bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent'>
                Tu Bolívar Hoy
              </span>
            </Link>
          </div>

          <div className='hidden items-center space-x-8 md:flex'>
            <Link
              href='https://play.google.com/store/apps/details?id=com.briancaldera.tubolivarhoy&pcampaignid=web_share'
              className='hover:text-primary-end text-gray-700 transition-colors'
            >
              Consigue la app
            </Link>
            <Link
              href='/#features'
              className='hover:text-primary-end text-gray-700 transition-colors'
            >
              Funcionalidades
            </Link>
            {user && (
              <div className='flex items-center gap-x-2'>
                <Button
                  size='xs'
                  className='from-primary-start to-primary-end bg-linear-60'
                  asChild={true}
                >
                  <Link href='/auth'>Panel Principal</Link>
                </Button>
                <CurrentUserAvatar />
              </div>
            )}
          </div>

          <div className='flex items-center md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='hover:text-primary-end text-gray-700 focus:outline-none'
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='border-b border-gray-100 bg-white md:hidden'>
          <div className='container mx-auto space-y-3 px-4 py-4'>
            <Link
              href='https://play.google.com/store/apps/details?id=com.briancaldera.tubolivarhoy&pcampaignid=web_share'
              className='hover:text-primary-end block text-gray-700 transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Consigue la app
            </Link>
            <Link
              href='/#features'
              className='hover:text-primary-end block text-gray-700 transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Funcionalidades
            </Link>
            <Link
              href='https://play.google.com/store/apps/details?id=com.briancaldera.tubolivarhoy&pcampaignid=web_share'
              className='from-primary-start to-primary-end block w-fit rounded-md bg-linear-to-r px-4 py-2 text-white transition-opacity hover:opacity-90'
              onClick={() => setIsMenuOpen(false)}
            >
              Descargar
            </Link>
            {user && (
              <>
                <Button
                  size='xs'
                  className='from-primary-start to-primary-end bg-linear-60'
                  asChild={true}
                >
                  <Link href='/auth'>Panel Principal</Link>
                </Button>
                <CurrentUserAvatar />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
