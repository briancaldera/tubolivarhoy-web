import { useAppState } from '@/hooks/use-app-state'
import { useShallow } from 'zustand/react/shallow'

export const useCurrency = () =>
  useAppState(
    useShallow((state) => ({
      currency: state.selectedCurrency,
      setCurrency: state.setSelectedCurrency,
    })),
  )
