import { StatusBar } from 'expo-status-bar'

import { useAppTheme } from '../data-access/shell-theme-provider'

export function ShellUiThemedStatusBar() {
  const { isLight } = useAppTheme()

  return <StatusBar animated style={isLight ? 'dark' : 'light'} />
}
