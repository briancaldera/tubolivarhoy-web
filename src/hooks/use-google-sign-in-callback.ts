'use client'

import { supabaseClient } from '@/lib/supabase/client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    handleSignInWithGoogle: (response: unknown) => Promise<void>
  }
}

export function useGoogleSignInCallback() {
  const router = useRouter()

  useEffect(() => {
    window.handleSignInWithGoogle = async (response: any) => {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:3000/auth/callback',
        },
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
}
