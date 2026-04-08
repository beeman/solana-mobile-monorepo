import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { AuthSession } from '@/lib/auth-client'

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
    <Card>
      <CardHeader>
        <CardTitle>Welcome, {session.user.name}</CardTitle>
        <CardDescription>{session.user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          disabled={isPending}
          onClick={() => {
            void onSignOut()
          }}
          variant="destructive"
        >
          Sign Out
        </Button>
      </CardContent>
    </Card>
  )
}
