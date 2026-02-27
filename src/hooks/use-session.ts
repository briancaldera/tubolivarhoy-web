import { useEffect, useState } from 'react'

import { supabaseClient } from '@/lib/supabase/client'
import { User } from '@/types/user'

export const useSession = () => {
  const [useSession, setuseSession] = useState<User | null>(null)

  useEffect(() => {
    const fetchProfileName = async () => {
      const { data, error } = await supabaseClient.auth.getSession()
      if (error) {
        console.error(error)
      }

      const session = data.session

      if (!session) {
        setuseSession(null)
      } else {
        setuseSession({
          email: data.session.user.email,
        })
      }
    }

    fetchProfileName()
  }, [])

  return useSession
}
