import { useQuery } from '@tanstack/react-query'
import { getSession } from '@/actions'

export const useSession = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    staleTime: 10 * 60 * 1000,
  })

  return {
    user: data,
    isPending,
    error,
  }
}
