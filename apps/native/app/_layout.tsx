import '@/polyfills'
import '@/global.css'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  createSolanaDevnet,
  MobileWalletProvider,
} from '@wallet-ui/react-native-kit'
import { Stack } from 'expo-router'
import { HeroUINativeProvider } from 'heroui-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'

import { AppThemeProvider } from '@/contexts/app-theme-context'
import { queryClient } from '@/utils/orpc'

export const unstable_settings = {
  initialRouteName: '(drawer)',
}

const cluster = createSolanaDevnet()
const identity = {
  name: 'Solana Mobile Stack',
  uri: 'https://solana.com',
  icon: 'favicon.png',
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
              <HeroUINativeProvider>
                <StackLayout />
              </HeroUINativeProvider>
            </AppThemeProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </MobileWalletProvider>
    </QueryClientProvider>
  )
}
