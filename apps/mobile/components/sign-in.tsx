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

import { authClient } from '@/lib/auth-client'
import { queryClient } from '@/utils/orpc'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
    setIsLoading(true)
    setError(null)

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError(error) {
          setError(error.error?.message || 'Failed to sign in')
          setIsLoading(false)
        },
        onSuccess() {
          setEmail('')
          setPassword('')
          queryClient.refetchQueries()
        },
        onFinished() {
          setIsLoading(false)
        },
      },
    )
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

        <Button onPress={handleLogin} isDisabled={isLoading} className="mt-1">
          {isLoading ? (
            <Spinner size="sm" color="default" />
          ) : (
            <Button.Label>Sign In</Button.Label>
          )}
        </Button>
      </View>
    </Surface>
  )
}

export { SignIn }
