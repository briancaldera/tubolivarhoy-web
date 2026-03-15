'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Route } from 'next'
import { Session } from '@/types/session'

export async function googleSignIn() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  })

  if (error) redirect('/error')

  if (data.url) {
    redirect(data.url as Route)
  }
}

export async function signOut() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (!error) redirect('/')
}

export async function getSession(): Promise<Session | null> {
  const supabase = await createClient()
  const res = await supabase.auth.getSession()

  if (!res.data.session) return null

  return {
    email: res.data.session?.user.email ?? null,
    name: res.data.session?.user?.user_metadata.full_name ?? '?',
    avatar: res.data.session?.user.user_metadata.avatar_url ?? null,
  }
}
