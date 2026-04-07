import { Spinner } from 'heroui-native'
import { Text, View } from 'react-native'

import { ShellUiContainer } from '@/features/shell/ui/shell-ui-container'

type TodoUiLoadingProps = {
  message: string
}

export function TodoUiLoading({ message }: TodoUiLoadingProps) {
  return (
    <ShellUiContainer>
      <View className="flex-1 items-center justify-center p-4">
        <Spinner size="lg" />
        <Text className="mt-3 text-muted text-sm">{message}</Text>
      </View>
    </ShellUiContainer>
  )
}
