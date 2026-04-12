import { useMemo } from 'react'
import { useSession } from '@/hooks/use-session'
import { createSupabaseClient } from '@/utils/create-supabase-client'

export function useSupabaseClient() {
  const { user } = useSession()

  return useMemo(() => createSupabaseClient(user?.accessToken), [user])
}
