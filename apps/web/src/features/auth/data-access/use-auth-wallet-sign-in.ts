import {
  assertIsAddress,
  assertIsSignature,
  getBase58Decoder,
} from '@solana/kit'
import { useMutation } from '@tanstack/react-query'
import type { UiWallet, UiWalletAccount } from '@wallet-ui/react'
import { useSignIn } from '@wallet-ui/react'
import {
  createSIWSInput,
  type SIWSNonceResponse,
} from 'better-auth-solana/client'

import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/lib/orpc'

async function fetchNonce({
  address,
}: {
  address: string
}): Promise<SIWSNonceResponse> {
  const result = await authClient.siws.nonce({
    walletAddress: address,
  })

  if (!result.data) {
    throw new Error(result.error?.message || 'Failed to fetch nonce')
  }

  return result.data
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return String(error || 'Sign in with Solana failed')
}

function signatureBytesToSignature(bytes: Uint8Array<ArrayBufferLike>) {
  const signature = getBase58Decoder().decode(bytes)

  assertIsSignature(signature)

  return signature
}

export function useAuthWalletSignIn({
  account,
  onError,
  onSuccess,
  statement = 'Sign in to Solana Mobile Monorepo',
  wallet,
}: {
  account: UiWalletAccount
  onError?: (error: unknown) => void
  onSuccess?: () => void
  statement?: string
  wallet: UiWallet
}) {
  const signIn = useSignIn(wallet)
  const session = authClient.useSession()
  const address = account.address

  assertIsAddress(address)

  const mutation = useMutation({
    mutationFn: async () => {
      const challenge = await fetchNonce({ address })
      const { signedMessage, signature } = await signIn(
        createSIWSInput({ address, challenge, statement }),
      )
      const message = new TextDecoder().decode(signedMessage)
      const signatureBase58 = signatureBytesToSignature(signature)

      const result = await authClient.siws.verify({
        message,
        signature: signatureBase58,
        walletAddress: address,
      })

      if (!result.data) {
        throw new Error(result.error?.message || 'Failed to verify signature')
      }

      await queryClient.invalidateQueries()
      await session.refetch()
    },
    onError,
    onSuccess,
  })

  return {
    isPending: mutation.isPending,
    signInWithWallet: async () => {
      try {
        await mutation.mutateAsync()
      } catch (error) {
        throw new Error(getErrorMessage(error))
      }
    },
  }
}
