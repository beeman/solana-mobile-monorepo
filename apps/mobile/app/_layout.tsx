import '@/polyfills'
import '@/global.css'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { debugApiUrl } from '@/lib/api-url'
import { AppProviders } from '@/lib/app-providers'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

debugApiUrl()

function StackLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ title: 'Modal', presentation: 'modal' }}
      />
    </Stack>
  )
}

export default function Layout() {
  return (
    <AppProviders>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StackLayout />
      </GestureHandlerRootView>
    </AppProviders>
  )
}
