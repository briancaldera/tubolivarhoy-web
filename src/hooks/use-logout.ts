'use client'

import { useMutation } from '@tanstack/react-query'
import { supabaseClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function useLogout() {
  const router = useRouter()

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const { error } = await supabaseClient.auth.signOut({ scope: 'local' })
      router.push('/')
    },
  })

  return { logout: () => logoutMutation.mutate() }
}
