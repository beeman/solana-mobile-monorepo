import { StatusBar } from 'expo-status-bar'
import { useThemeColor } from 'heroui-native'

import { useAppTheme } from '@/contexts/app-theme-context'

export function ThemedStatusBar() {
  const { isLight } = useAppTheme()
  const backgroundColor = useThemeColor('background')

  return (
    <StatusBar
      animated
      style={isLight ? 'dark' : 'light'}
      backgroundColor={backgroundColor}
    />
  )
}
