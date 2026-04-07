import { Button, Card } from 'heroui-native'
import { Text } from 'react-native'

import type { AuthSession } from '@/lib/auth-client'
import { ellipsify } from '@/lib/ellipsify'

export function AuthUiSession({
  isPending,
  onSignOut,
  session,
}: {
  isPending: boolean
  onSignOut: () => Promise<void> | void
  session: AuthSession
}) {
  return (
    <Card className="mb-6 p-4">
      <Card.Title className="mb-3">
        Welcome,{' '}
        <Text className="font-medium">{ellipsify(session.user.name, 8)}</Text>
      </Card.Title>
      <Text className="mb-4 text-muted text-sm">{session.user.email}</Text>
      <Button onPress={onSignOut} isDisabled={isPending} variant="danger-soft">
        Sign Out
      </Button>
    </Card>
  )
}
