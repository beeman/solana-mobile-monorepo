import { getBase58Decoder, getBase64Encoder, getUtf8Decoder } from '@solana/kit'
import { env } from '@solana-mobile-monorepo/env/native'
import { useMobileWallet } from '@wallet-ui/react-native-kit'
import { createSIWSInput } from 'better-auth-solana/client'
import { useState } from 'react'
import { Alert } from 'react-native'
import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/utils/orpc'

export function useSolanaSignIn() {
  const { account, connect, signIn } = useMobileWallet()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)

    try {
      const activeAccount = account || (await connect())
      const address = activeAccount.address
      const cluster = env.EXPO_PUBLIC_SOLANA_AUTH_CLUSTER
      const { data: nonce, error: nonceError } = await authClient.siws.nonce({
        cluster,
        walletAddress: address,
      })

      if (nonceError || !nonce) {
        throw new Error(nonceError?.message || 'Failed to get nonce')
      }

      const result = await signIn(
        createSIWSInput({
          address,
          challenge: nonce,
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
      const { data: verifyData, error: verifyError } =
        await authClient.siws.verify({
          cluster,
          message: messageUtf8,
          signature: signatureBase58,
          walletAddress: address,
        })

      if (verifyError || !verifyData) {
        throw new Error(verifyError?.message || 'Verification failed')
      }

      await queryClient.invalidateQueries()
      await authClient.getSession()
    } catch (error) {
      console.error('Solana sign in failed', error)
      Alert.alert(
        'Sign In Failed',
        error instanceof Error ? error.message : String(error),
      )
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleSignIn,
    isLoading,
  }
}
