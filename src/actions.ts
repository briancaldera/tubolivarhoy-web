'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Route } from 'next'

export async function googleSignIn() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  })
  if (data.url) {
    redirect(data.url as Route) // use the redirect API for your server framework
  }
}
