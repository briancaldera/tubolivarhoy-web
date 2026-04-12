import { create } from 'zustand'
import { Currency } from '@/types/currency'

type AppState = {
  selectedCurrency: Currency
  setSelectedCurrency: (selectedCurrency: Currency) => void
}

export const useAppState = create<AppState>()((set) => ({
  selectedCurrency: 'USD',
  setSelectedCurrency: (selectedCurrency: Currency) =>
    set({ selectedCurrency: selectedCurrency }),
}))
