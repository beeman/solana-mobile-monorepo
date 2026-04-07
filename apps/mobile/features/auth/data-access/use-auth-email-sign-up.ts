import { useState } from 'react'

import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/lib/orpc'

type SignUpApiResponse = {
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

export function useAuthEmailSignUp() {
  const [isPending, setIsPending] = useState(false)

  async function signUpWithEmail({
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
      const result = (await authClient.signUp.email({
        email,
        name,
        password,
      })) as SignUpApiResponse

      if (result?.error) {
        throw new Error(result.error.message || 'Failed to sign up')
      }

      await queryClient.refetchQueries()
    } catch (error) {
      throw new Error(extractErrorMessage(error, 'Failed to sign up'))
    } finally {
      setIsPending(false)
    }
  }

  return {
    isPending,
    signUpWithEmail,
  }
}
