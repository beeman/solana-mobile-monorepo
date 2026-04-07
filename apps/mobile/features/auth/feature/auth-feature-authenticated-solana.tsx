import { Card } from 'heroui-native'
import { Alert, View } from 'react-native'
import { useAuthWalletSignIn } from '../data-access/use-auth-wallet-sign-in'
import { AuthUiSolanaSignInButton } from '../ui/auth-ui-solana-sign-in-button'

function getSignInErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return String(error || 'Sign in with Solana failed')
}

export function AuthFeatureAuthenticatedSolana() {
  const { isLoading, signInWithWallet } = useAuthWalletSignIn()

  async function handleSolanaSignIn() {
    try {
      await signInWithWallet()
    } catch (error) {
      Alert.alert('Sign In Failed', getSignInErrorMessage(error))
    }
  }

  return (
    <Card className="mb-6 p-4">
      <Card.Title className="mb-3">Authenticate with Solana</Card.Title>
      <View className="flex gap-6">
        <AuthUiSolanaSignInButton
          isLoading={isLoading}
          onSignIn={handleSolanaSignIn}
        />
      </View>
    </Card>
  )
}
