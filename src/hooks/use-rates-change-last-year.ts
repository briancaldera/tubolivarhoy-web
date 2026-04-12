import { useQuery } from '@tanstack/react-query'
import { useSupabaseClient } from '@/hooks/use-supabase-client'
import { z } from 'zod'
import { Currency } from '@/types/currency'

const ResponseSchema = z.object({
  currency: z.string(),
  latest_rate: z.number(),
  rate_7d: z.number(),
  rate_30d: z.number(),
  rate_90d: z.number(),
  rate_1y: z.number(),
})

export function useRatesChangeLastYear(currency: Currency) {
  const client = useSupabaseClient()

  const { data, error, isPending } = useQuery({
    queryKey: ['rates', 'lastYear', { currency: currency }],
    staleTime: 1000 * 60 * 30,
    queryFn: async () => {
      const { data, error } = await client
        .from('rates_last_year')
        .select('*')
        .eq('currency', currency)

      if (error) throw error

      return ResponseSchema.parse(data[0])
    },
  })

  return {
    rateChange: data,
    error,
    isPending,
  }
}
