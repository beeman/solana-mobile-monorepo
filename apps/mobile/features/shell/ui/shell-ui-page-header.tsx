import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from 'heroui-native'
import type { ReactNode } from 'react'
import { Text, View } from 'react-native'

export function ShellUiPageHeader({
  description,
  icon,
  title,
}: {
  description: ReactNode | string
  icon: keyof typeof Ionicons.glyphMap
  title: string
}) {
  const foregroundColor = useThemeColor('foreground')
  return (
    <View className="mb-4">
      <View className="flex-row items-center gap-2">
        <Ionicons name={icon} size={24} color={foregroundColor} />
        <Text className="font-semibold text-2xl text-foreground tracking-tight">
          {title}
        </Text>
      </View>
      {typeof description === 'string' ? (
        <Text className="mt-1 text-muted text-sm">{description}</Text>
      ) : (
        description
      )}
    </View>
  )
}
