'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from '@/hooks/use-session'
import { createClient } from '@supabase/supabase-js'

export function useApiKeys() {
  const { user } = useSession()

  const { isPending, error, data } = useQuery({
    enabled: !!user,
    queryKey: ['keys', user?.id],
    staleTime: 20 * 60 * 1000,
    queryFn: async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        },
      )
      const res = await supabase.from('my_api_keys').select('*')

      return res.data
    },
  })

  return {
    isPending,
    error,
    apiKeys: data,
  }
}
