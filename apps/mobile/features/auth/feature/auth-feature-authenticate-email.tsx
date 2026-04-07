import { Card } from 'heroui-native'
import { View } from 'react-native'
import { AuthUiSignInForm } from '@/features/auth/ui/auth-ui-sign-in-form'
import { AuthUiSignUpForm } from '@/features/auth/ui/auth-ui-sign-up-form'

export function AuthFeatureAuthenticateEmail() {
  return (
    <Card className="mb-6 p-4">
      <Card.Title className="mb-3">Authenticate with email</Card.Title>
      <View className="flex gap-6">
        <AuthUiSignInForm />
        <AuthUiSignUpForm />
      </View>
    </Card>
  )
}
