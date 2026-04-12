import { useQuery } from '@tanstack/react-query'
import { getSession } from '@/actions'
import { useAppState } from '@/hooks/use-app-state'
import { useShallow } from 'zustand/react/shallow'
import { useEffect } from 'react'

export const useSession = () => {
  const { session, setSession } = useAppState(
    useShallow((state) => ({
      session: state.session,
      setSession: state.setSession,
    })),
  )

  const { data, isPending, error } = useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    staleTime: 30 * 60 * 1000,
  })

  useEffect(() => {
    setSession(data ?? null)
  }, [data, setSession])

  return {
    user: session,
    isPending,
    error,
  }
}
