import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useThemeColor } from 'heroui-native'

import { ShellThemeToggle } from '@/features/shell/ui/shell-theme-toggle'

export default function TabLayout() {
  const themeColorBackground = useThemeColor('background')
  const themeColorForeground = useThemeColor('foreground')

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColorForeground,
        tabBarStyle: {
          backgroundColor: themeColorBackground,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true,
          headerTitle: 'Solana Mobile Monorepo',
          headerStyle: {
            backgroundColor: themeColorBackground,
          },
          headerTintColor: themeColorForeground,
          headerTitleStyle: {
            color: themeColorForeground,
            fontWeight: '600',
          },
          headerRight: () => <ShellThemeToggle />,
          tabBarIcon: ({ focused, ...props }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="examples"
        options={{
          headerShown: false,
          title: 'Examples',
          tabBarIcon: ({ focused, ...props }) => (
            <Ionicons name={focused ? 'apps' : 'apps-outline'} {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: true,
          headerStyle: {
            backgroundColor: themeColorBackground,
          },
          headerTintColor: themeColorForeground,
          headerTitleStyle: {
            color: themeColorForeground,
            fontWeight: '600',
          },
          headerRight: () => <ShellThemeToggle />,
          tabBarIcon: ({ focused, ...props }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} {...props} />
          ),
        }}
      />
    </Tabs>
  )
}
