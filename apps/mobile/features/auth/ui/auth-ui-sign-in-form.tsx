import {
  Button,
  FieldError,
  Input,
  Label,
  Spinner,
  Surface,
  TextField,
} from 'heroui-native'
import { useState } from 'react'
import { Text, View } from 'react-native'

import { useAuthEmailSignIn } from '../data-access/use-auth-email-sign-in'

export function AuthUiSignInForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const { isPending, signInWithEmail } = useAuthEmailSignIn()

  async function handleLogin() {
    setIsLoading(true)
    setError(null)

    try {
      await signInWithEmail({ email, password })
      setEmail('')
      setPassword('')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Surface variant="secondary">
      <Text className="mb-4 font-medium text-foreground">Sign In</Text>

      <FieldError isInvalid={!!error} className="mb-3">
        {error}
      </FieldError>

      <View className="gap-3">
        <TextField>
          <Label>Email</Label>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </TextField>

        <TextField>
          <Label>Password</Label>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
        </TextField>

        <Button
          onPress={handleLogin}
          isDisabled={isLoading || isPending}
          className="mt-1"
        >
          {isLoading || isPending ? (
            <Spinner size="sm" color="default" />
          ) : (
            <Button.Label>Sign In</Button.Label>
          )}
        </Button>
      </View>
    </Surface>
  )
}
