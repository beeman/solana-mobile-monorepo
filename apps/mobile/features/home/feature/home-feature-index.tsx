import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'
import { useAuthSession } from '@/features/auth/data-access/use-auth-session'
import { AuthFeatureAuthenticated } from '@/features/auth/feature/auth-feature-authenticated'
import { AuthFeatureAuthenticatedSolana } from '@/features/auth/feature/auth-feature-authenticated-solana'
import { AuthUiConnectionStatus } from '@/features/auth/ui/auth-ui-connection-status'
import { ShellUiScrollView } from '@/features/shell/ui/shell-ui-scroll-view'
import { orpc } from '@/lib/orpc'

export function HomeFeatureIndex() {
  const { data: session } = useAuthSession()
  const healthCheck = useQuery(orpc.healthCheck.queryOptions())

  return (
    <ShellUiScrollView className="p-4">
      <View className="flex w-full flex-col gap-4">
        <AuthUiConnectionStatus
          isConnected={healthCheck?.data === 'OK'}
          isLoading={healthCheck?.isLoading}
        />
        {session ? (
          <AuthFeatureAuthenticated session={session} />
        ) : (
          <AuthFeatureAuthenticatedSolana />
        )}
      </View>
    </ShellUiScrollView>
  )
}
