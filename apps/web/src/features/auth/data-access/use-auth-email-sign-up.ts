import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/lib/orpc'

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return String(error || 'Sign up failed')
}

export function useAuthEmailSignUp() {
  const [isPending, setIsPending] = useState(false)

  async function signUpEmail({
    email,
    name,
    password,
  }: {
    email: string
    name: string
    password: string
  }) {
    setIsPending(true)

    try {
      await new Promise<void>((resolve, reject) => {
        void authClient.signUp.email(
          {
            email,
            name,
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
    signUpEmail,
  }
}
