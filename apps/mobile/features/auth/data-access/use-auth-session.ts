import { useState } from 'react'

import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/lib/orpc'

export function useAuthSession() {
  return authClient.useSession()
}

export function useAuthSignOut() {
  const [isPending, setIsPending] = useState(false)

  async function signOut() {
    setIsPending(true)

    try {
      await authClient.signOut()
      await queryClient.invalidateQueries()
    } finally {
      setIsPending(false)
    }
  }

  return {
    isPending,
    signOut,
  }
}
