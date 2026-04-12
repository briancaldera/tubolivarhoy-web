import { useQuery } from '@tanstack/react-query'
import { useSession } from '@/hooks/use-session'
import { z } from 'zod'
import { useSupabaseClient } from '@/hooks/use-supabase-client'

export function useQuota() {
  const { user } = useSession()
  const supabase = useSupabaseClient()

  const { data, isPending, error } = useQuery({
    queryKey: ['my-quota', { userId: user?.id }],
    staleTime: 1000 * 30,
    enabled: !!user,
    queryFn: async () => {
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
