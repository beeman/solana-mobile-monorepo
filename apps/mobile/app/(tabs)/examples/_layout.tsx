import { Ionicons } from '@expo/vector-icons'
import type { DrawerNavigationOptions } from '@react-navigation/drawer'
import { Drawer } from 'expo-router/drawer'
import { useThemeColor } from 'heroui-native'
import { Text } from 'react-native'

function Icon({
  color,
  focused,
  name,
  size,
}: {
  color: string
  focused: boolean
  name: keyof typeof Ionicons.glyphMap
  size: number
}) {
  const themeColorForeground = useThemeColor('foreground')

  return (
    <Ionicons
      name={name}
      size={size}
      color={focused ? color : themeColorForeground}
    />
  )
}

function Label({
  color,
  focused,
  label,
}: {
  color: string
  focused: boolean
  label: string
}) {
  const themeColorForeground = useThemeColor('foreground')

  return (
    <Text style={{ color: focused ? color : themeColorForeground }}>
      {label}
    </Text>
  )
}

function useDrawerScreenOptions(): DrawerNavigationOptions {
  const themeColorBackground = useThemeColor('background')
  const themeColorForeground = useThemeColor('foreground')
  return {
    headerTintColor: themeColorForeground,
    headerStyle: { backgroundColor: themeColorBackground },
    headerTitleStyle: {
      fontWeight: '600',
      color: themeColorForeground,
    },
    drawerStyle: { backgroundColor: themeColorBackground },
  }
}
function ExamplesDrawerLayout() {
  const screenOptions = useDrawerScreenOptions()

  return (
    <Drawer initialRouteName="index" screenOptions={screenOptions}>
      <Drawer.Screen
        name="index"
        options={{
          drawerIcon: (props) => <Icon name="apps-outline" {...props} />,
          drawerLabel: (props) => <Label label="Examples" {...props} />,
          headerTitle: 'Examples',
        }}
      />
      <Drawer.Screen
        name="ai"
        options={{
          drawerIcon: (props) => (
            <Icon name="chatbubble-ellipses-outline" {...props} />
          ),
          drawerLabel: (props) => <Label label="AI" {...props} />,
          headerTitle: 'AI',
        }}
      />
      <Drawer.Screen
        name="solana"
        options={{
          drawerIcon: (props) => <Icon name="wallet-outline" {...props} />,
          drawerLabel: (props) => <Label label="Solana" {...props} />,
          headerTitle: 'Solana',
        }}
      />
      <Drawer.Screen
        name="todos"
        options={{
          drawerIcon: (props) => <Icon name="checkbox-outline" {...props} />,
          drawerLabel: (props) => <Label label="Todos" {...props} />,
          headerTitle: 'Todos',
        }}
      />
    </Drawer>
  )
}

export default ExamplesDrawerLayout
