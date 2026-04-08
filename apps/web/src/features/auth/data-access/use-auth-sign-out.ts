import { useState } from 'react'

import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/lib/orpc'

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return String(error || 'Sign out failed')
}

export function useAuthSignOut() {
  const [isPending, setIsPending] = useState(false)

  async function signOut() {
    setIsPending(true)

    try {
      const result = await authClient.signOut()

      if (result.error) {
        throw new Error(result.error.message || result.error.statusText)
      }

      await queryClient.invalidateQueries()
    } catch (error) {
      throw new Error(getErrorMessage(error))
    } finally {
      setIsPending(false)
    }
  }

  return {
    isPending,
    signOut,
  }
}
