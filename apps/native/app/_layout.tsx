import '@/polyfills'
import '@/global.css'
import { env } from '@solana-mobile-monorepo/env/native'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  MobileWalletProvider,
  type SolanaCluster,
} from '@wallet-ui/react-native-kit'
import { Stack } from 'expo-router'
import { HeroUINativeProvider } from 'heroui-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'

import { ThemedStatusBar } from '@/components/themed-status-bar'
import { AppThemeProvider } from '@/contexts/app-theme-context'
import { debugServerUrl } from '@/lib/server-url'
import { queryClient } from '@/utils/orpc'

export const unstable_settings = {
  initialRouteName: '(drawer)',
}

debugServerUrl()

const cluster = {
  id: `solana:${env.EXPO_PUBLIC_SOLANA_AUTH_CLUSTER}`,
  url: env.EXPO_PUBLIC_SOLANA_CLUSTER_URL,
} satisfies Pick<SolanaCluster, 'id' | 'url'>

const identity = {
  icon: 'favicon.png',
  name: 'Solana Mobile Monorepo',
  uri: 'https://solana.com',
}

function StackLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ title: 'Modal', presentation: 'modal' }}
      />
    </Stack>
  )
}

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <MobileWalletProvider cluster={cluster} identity={identity}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <AppThemeProvider>
              <HeroUINativeProvider
                config={{
                  devInfo: {
                    stylingPrinciples: false,
                  },
                }}
              >
                <ThemedStatusBar />
                <StackLayout />
              </HeroUINativeProvider>
            </AppThemeProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </MobileWalletProvider>
    </QueryClientProvider>
  )
}
