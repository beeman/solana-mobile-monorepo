import type { AuthSession } from '@/lib/auth-client'
import { useAuthSignOut } from '../data-access/use-auth-session'
import { AuthUiSession } from '../ui/auth-ui-session'

export function AuthFeatureAuthenticated({
  session,
}: {
  session: AuthSession
}) {
  const { isPending, signOut } = useAuthSignOut()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <AuthUiSession
      isPending={isPending}
      onSignOut={handleSignOut}
      session={session}
    />
  )
}
