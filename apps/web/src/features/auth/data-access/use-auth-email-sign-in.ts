import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/lib/orpc'

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return String(error || 'Sign in failed')
}

export function useAuthEmailSignIn() {
  const [isPending, setIsPending] = useState(false)

  async function signInEmail({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    setIsPending(true)

    try {
      await new Promise<void>((resolve, reject) => {
        void authClient.signIn.email(
          {
            email,
            password,
          },
          {
            onError: (error) =>
              reject(new Error(error.error.message || error.error.statusText)),
            onSuccess: () => resolve(),
          },
        )
      })

      await queryClient.invalidateQueries()
    } catch (error) {
      throw new Error(getErrorMessage(error))
    } finally {
      setIsPending(false)
    }
  }

  return {
    isPending,
    signInEmail,
  }
}
