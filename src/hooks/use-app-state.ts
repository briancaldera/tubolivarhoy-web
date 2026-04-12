import { create } from 'zustand'
import { Currency } from '@/types/currency'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../generated/database.types'
import { createSupabaseClient } from '@/utils/create-supabase-client'
import { Session } from '@/types/session'

type SessionState = {
  session: Session | null
  setSession: (session: Session | null) => void
}

type DatabaseClientState = {
  supabaseClient: SupabaseClient<Database>
}

type AppState = {
  selectedCurrency: Currency
  setSelectedCurrency: (selectedCurrency: Currency) => void
} & DatabaseClientState &
  SessionState

export const useAppState = create<AppState>()((set) => ({
  session: null,
  setSession: (session: Session | null) => {
    set((prev) => {
      return {
        ...prev,
        session,
        supabaseClient:
          session?.accessToken === prev.session?.accessToken
            ? prev.supabaseClient
            : createSupabaseClient(session?.accessToken),
      }
    })
  },
  selectedCurrency: 'USD',
  setSelectedCurrency: (selectedCurrency: Currency) =>
    set({ selectedCurrency: selectedCurrency }),
  supabaseClient: createSupabaseClient(),
}))
