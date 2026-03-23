import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, useThemeColor } from 'heroui-native'
import { Text, View } from 'react-native'

import { Container } from '@/components/container'
import { SignIn } from '@/components/sign-in'
import { SignUp } from '@/components/sign-up'
import { SolanaConnect } from '@/components/solana-connect'
import { SolanaSignInButton } from '@/components/solana-sign-in-button'
import { type AuthSession, authClient } from '@/lib/auth-client'
import { orpc, queryClient } from '@/utils/orpc'

export default function Home() {
  const { data: session } = authClient.useSession()
  const healthCheck = useQuery(orpc.healthCheck.queryOptions())

  return (
    <Container>
      <View className="flex w-full flex-col gap-6 p-6">
        <Text className="mb-2 text-center font-bold text-4xl text-foreground">
          Solana Mobile Monorepo
        </Text>
        <HomeUiStatus
          isConnected={healthCheck?.data === 'OK'}
          isLoading={healthCheck?.isLoading}
        />
        <SolanaConnect />
        {session ? <HomeUiSession session={session} /> : <HomeUiNoSession />}
      </View>
    </Container>
  )
}

function HomeUiStatus({
  isConnected,
  isLoading,
}: {
  isConnected: boolean
  isLoading: boolean
}) {
  const mutedColor = useThemeColor('muted')
  const successColor = useThemeColor('success')
  const dangerColor = useThemeColor('danger')

  return (
    <Card className="p-4">
      <View className="flex-row items-center">
        <View
          className={`mr-3 h-3 w-3 rounded-full ${isConnected ? 'bg-success' : 'bg-muted'}`}
        />
        <View className="flex-1">
          <Text className="mb-1 font-medium text-foreground">ORPC Backend</Text>
          <Card.Description>
            {isLoading
              ? 'Checking connection...'
              : isConnected
                ? 'Connected to API'
                : 'API Disconnected'}
          </Card.Description>
        </View>
        {isLoading && (
          <Ionicons name="hourglass-outline" size={20} color={mutedColor} />
        )}
        {!isLoading && isConnected && (
          <Ionicons name="checkmark-circle" size={20} color={successColor} />
        )}
        {!isLoading && !isConnected && (
          <Ionicons name="close-circle" size={20} color={dangerColor} />
        )}
      </View>
    </Card>
  )
}

function HomeUiNoSession() {
  return (
    <Card className="mb-6 p-4">
      <Card.Title className="mb-3">No active session</Card.Title>
      <View className="flex gap-6">
        <SolanaSignInButton />
        <View className="flex-row items-center gap-4">
          <View className="h-[1] flex-1 bg-muted/20" />
          <Text className="text-muted text-xs uppercase">
            Or continue with email
          </Text>
          <View className="h-[1] flex-1 bg-muted/20" />
        </View>
        <SignIn />
        <SignUp />
      </View>
    </Card>
  )
}

function HomeUiSession({ session }: { session: AuthSession }) {
  return (
    <Card className="mb-6 p-4">
      <Card.Title className="mb-3">
        Welcome, <Text className="font-medium">{session.user.name}</Text>
      </Card.Title>
      <Text className="mb-4 text-muted text-sm">{session.user.email}</Text>
      <Button
        onPress={() => {
          authClient.signOut()
          void queryClient.invalidateQueries()
        }}
        variant="danger-soft"
      >
        Sign Out
      </Button>
    </Card>
  )
}
