import { Button, Spinner } from 'heroui-native'

export function AuthUiSolanaSignInButton({
  isLoading,
  onSignIn,
}: {
  isLoading: boolean
  onSignIn: () => Promise<void> | void
}) {
  return (
    <Button onPress={onSignIn} isDisabled={isLoading} variant="secondary">
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        <Button.Label>Sign in with Solana</Button.Label>
      )}
    </Button>
  )
}
