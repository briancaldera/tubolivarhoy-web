'use client'

import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/supabase/client'
import Script from 'next/script'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect } from 'react'

declare global {
  interface Window {
    handleSignInWithGoogle: (response: unknown) => Promise<void>
  }
}

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    window.handleSignInWithGoogle = async (response: any) => {
      const { data, error } = await supabaseClient.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      })

      if (error) console.error('Auth error:', error.message)

      if (!error) {
        router.push('/auth')
      }
    }

    return () => {
      // Clean up to avoid memory leaks or stale closures
      delete (window as any).handleSignInWithGoogle
    }
  }, [supabaseClient])

  return (
    <section>
      <div className='py-20'>
        <Card className='max-w-md mx-auto'>
          <CardHeader>
            <CardTitle>Registrarse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex justify-center'>
              <div
                id='g_id_onload'
                data-client_id='987782384181-e5v14kbpjcr8f7tsdrjef95kbmrr1ebj.apps.googleusercontent.com'
                data-context='signup'
                data-ux_mode='popup'
                data-callback='handleSignInWithGoogle'
                data-auto_prompt='false'
                data-use_fedcm_for_prompt='true'
              ></div>

              <div
                className='g_id_signin'
                data-type='standard'
                data-shape='rectangular'
                data-theme='outline'
                data-text='signup_with'
                data-size='large'
                data-logo_alignment='left'
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Script
        src='https://accounts.google.com/gsi/client'
        async
        referrerPolicy={
          process.env.NODE_ENV === 'production'
            ? 'strict-origin-when-cross-origin'
            : 'no-referrer-when-downgrade'
        }
      />
    </section>
  )
}
