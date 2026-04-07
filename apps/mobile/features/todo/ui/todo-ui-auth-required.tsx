import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Button, Surface, useThemeColor } from 'heroui-native'
import { Text, View } from 'react-native'

import { ShellUiScrollView } from '@/features/shell/ui/shell-ui-scroll-view'

export function TodoUiAuthRequired() {
  const mutedColor = useThemeColor('muted')
  const router = useRouter()

  return (
    <ShellUiScrollView>
      <View className="flex-1 justify-center p-4">
        <Surface
          variant="secondary"
          className="items-center rounded-lg px-5 py-8"
        >
          <Ionicons name="lock-closed-outline" size={36} color={mutedColor} />
          <Text className="mt-4 text-center font-semibold text-foreground text-xl">
            Sign in to view your todos
          </Text>
          <Text className="mt-2 text-center text-muted text-sm">
            Your todo list is tied to your account. Log in to create and manage
            tasks.
          </Text>
          <Button className="mt-5" onPress={() => router.push('/')}>
            Go to Home
          </Button>
        </Surface>
      </View>
    </ShellUiScrollView>
  )
}
