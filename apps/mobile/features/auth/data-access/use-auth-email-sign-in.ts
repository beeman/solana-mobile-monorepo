import { useState } from 'react'

import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/lib/orpc'

type SignInApiResponse = {
  data?: unknown
  error?: {
    message?: string
  } | null
}

function extractErrorMessage(error: unknown, fallbackMessage: string): string {
  if (error && typeof error === 'object' && 'error' in error) {
    const nestedError = (error as { error?: { message?: string } | null }).error
    if (nestedError?.message) {
      return nestedError.message
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallbackMessage
}

export function useAuthEmailSignIn() {
  const [isPending, setIsPending] = useState(false)

  async function signInWithEmail({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    setIsPending(true)
    try {
      const result = (await authClient.signIn.email({
        email,
        password,
      })) as SignInApiResponse

      if (result?.error) {
        throw new Error(result.error.message || 'Failed to sign in')
      }

      await queryClient.refetchQueries()
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to sign in'))
    } finally {
      setIsPending(false)
    }
  }

  return {
    isPending,
    signInWithEmail,
  }
}
