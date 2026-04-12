import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../generated/database.types'

export function createSupabaseClient(
  accessToken?: string,
): SupabaseClient<Database> {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    accessToken
      ? {
          global: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        }
      : undefined,
  )
}
