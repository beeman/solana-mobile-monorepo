import { FieldError, Surface } from 'heroui-native'
import { Text, View } from 'react-native'

import { ShellUiScrollView } from '@/features/shell/ui/shell-ui-scroll-view'

type AiUiChatErrorProps = {
  message: string
}

export function AiUiChatError({ message }: AiUiChatErrorProps) {
  return (
    <ShellUiScrollView>
      <View className="flex-1 items-center justify-center px-4">
        <Surface variant="secondary" className="rounded-lg p-4">
          <FieldError isInvalid className="mb-2">
            {message}
          </FieldError>
          <Text className="text-center text-muted text-xs">
            Please check your connection and try again.
          </Text>
        </Surface>
      </View>
    </ShellUiScrollView>
  )
}
