import { useAuthSession } from '@/features/auth/data-access/use-auth-session'
import { AuthFeatureAuthenticateEmail } from '@/features/auth/feature/auth-feature-authenticate-email'
import { AuthFeatureAuthenticated } from '@/features/auth/feature/auth-feature-authenticated'
import { AuthFeatureAuthenticatedSolana } from '@/features/auth/feature/auth-feature-authenticated-solana'
import { ShellUiScrollView } from '@/features/shell/ui/shell-ui-scroll-view'

export function ProfileFeatureIndex() {
  const { data: session } = useAuthSession()

  return (
    <ShellUiScrollView className="p-4">
      {session ? (
        <AuthFeatureAuthenticated session={session} />
      ) : (
        <>
          <AuthFeatureAuthenticatedSolana />
          <AuthFeatureAuthenticateEmail />
        </>
      )}
    </ShellUiScrollView>
  )
}
