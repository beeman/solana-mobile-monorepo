import { getBase58Decoder, getBase64Encoder, getUtf8Decoder } from '@solana/kit'
import { useMobileWallet } from '@wallet-ui/react-native-kit'
import { createSIWSInput } from 'better-auth-solana/client'
import { useState } from 'react'

import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/lib/orpc'

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return String(error || 'Solana sign in failed')
}

export function useAuthWalletSignIn() {
  const { account, connect, signIn } = useMobileWallet()
  const [isLoading, setIsLoading] = useState(false)

  async function signInWithWallet() {
    setIsLoading(true)
    try {
      const activeAccount = account || (await connect())
      const address = activeAccount.address
      const nonceResult = await authClient.siws.nonce({
        walletAddress: address,
      })

      if (!nonceResult.data) {
        throw new Error(nonceResult.error?.message || 'Failed to get nonce')
      }

      const result = await signIn(
        createSIWSInput({
          address,
          challenge: nonceResult.data,
          statement: 'Sign in to Solana Mobile Monorepo',
        }),
      )
      const signatureBase64 = getUtf8Decoder().decode(result.signature)
      const signedMessageBase64 = getUtf8Decoder().decode(result.signedMessage)
      const signatureBase58 = getBase58Decoder().decode(
        getBase64Encoder().encode(signatureBase64),
      )
      const messageUtf8 = getUtf8Decoder().decode(
        getBase64Encoder().encode(signedMessageBase64),
      )
      const verifyResult = await authClient.siws.verify({
        message: messageUtf8,
        signature: signatureBase58,
        walletAddress: address,
      })

      if (!verifyResult.data) {
        throw new Error(verifyResult.error?.message || 'Verification failed')
      }

      queryClient.invalidateQueries()
      await authClient.getSession()
    } catch (error) {
      throw new Error(extractErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    signInWithWallet,
  }
}
