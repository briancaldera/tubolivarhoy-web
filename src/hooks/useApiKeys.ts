'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from '@/hooks/use-session'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/../generated/database.types'

export function useApiKeys() {
  const { user } = useSession()

  const { isPending, error, data } = useQuery({
    enabled: !!user,
    queryKey: ['keys', user?.id],
    staleTime: 20 * 60 * 1000,
    queryFn: async (): Promise<APIKey[] | null> => {
      const supabase = createClient<Database>(
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

      return (
        res.data?.map((key) => {
          return {
            id: key.id ?? '',
            name: key.name ?? '',
            created_at: key.created_at ?? '',
            last_used_at: key.last_used_at ?? '',
            expires_at: key.expires_at ?? '',
            prefix: key.prefix ?? '',
            revoked_at: key.revoked_at ?? '',
            updated_at: key.updated_at ?? '',
          } satisfies APIKey
        }) ?? null
      )
    },
  })

  return {
    isPending,
    error,
    apiKeys: data,
  }
}
