import { useQuery } from '@tanstack/react-query'
import { useSession } from '@/hooks/use-session'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/../generated/database.types'
import { z } from 'zod'

export function useQuota() {
  const { user } = useSession()

  const { data, isPending, error } = useQuery({
    queryKey: ['my-quota', { userId: user?.id }],
    staleTime: 1000 * 30,
    enabled: !!user,
    queryFn: async () => {
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

      const { data, error } = await supabase
        .from('my_quota_usage')
        .select('*')
        .limit(1)

      if (error) throw error

      const quota = (data ?? [])[0]

      return z
        .object({
          quota: z.number(),
          usage: z.number(),
        })
        .parse(quota)
    },
  })

  return { quota: data, error, isPending }
}
