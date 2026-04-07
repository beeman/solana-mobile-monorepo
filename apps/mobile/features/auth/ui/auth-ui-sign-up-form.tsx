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

import { useAuthEmailSignUp } from '../data-access/use-auth-email-sign-up'

export function AuthUiSignUpForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const { isPending, signUpWithEmail } = useAuthEmailSignUp()

  async function handlePress() {
    setIsLoading(true)
    setError(null)

    try {
      await signUpWithEmail({ email, name, password })
      setName('')
      setEmail('')
      setPassword('')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign up')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Surface variant="secondary">
      <Text className="mb-4 font-medium text-foreground">Create Account</Text>

      <FieldError isInvalid={!!error} className="mb-3">
        {error}
      </FieldError>

      <View className="gap-3">
        <TextField>
          <Label>Name</Label>
          <Input value={name} onChangeText={setName} placeholder="John Doe" />
        </TextField>

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
          onPress={handlePress}
          isDisabled={isLoading || isPending}
          className="mt-1"
        >
          {isLoading || isPending ? (
            <Spinner size="sm" color="default" />
          ) : (
            <Button.Label>Create Account</Button.Label>
          )}
        </Button>
      </View>
    </Surface>
  )
}
