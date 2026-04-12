import { useAppState } from '@/hooks/use-app-state'

export function useSupabaseClient() {
  return useAppState((state) => state.supabaseClient)
}
