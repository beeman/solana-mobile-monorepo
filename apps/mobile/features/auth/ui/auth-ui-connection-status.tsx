import { Ionicons } from '@expo/vector-icons'
import { Card, useThemeColor } from 'heroui-native'
import { Text, View } from 'react-native'

export function AuthUiConnectionStatus({
  isConnected,
  isLoading,
}: {
  isConnected: boolean
  isLoading: boolean
}) {
  const dangerColor = useThemeColor('danger')
  const mutedColor = useThemeColor('muted')
  const successColor = useThemeColor('success')

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
