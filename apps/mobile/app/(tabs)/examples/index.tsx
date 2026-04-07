import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Card, useThemeColor } from 'heroui-native'
import { Pressable, Text, View } from 'react-native'
import { ShellUiPageHeader } from '@/features/shell/ui/shell-ui-page-header'
import { ShellUiScrollView } from '@/features/shell/ui/shell-ui-scroll-view'

type ExampleRoute = '/examples/ai' | '/examples/solana' | '/examples/todos'
type ExampleIconName = keyof typeof Ionicons.glyphMap

type Example = {
  description: string
  href: ExampleRoute
  icon: keyof typeof Ionicons.glyphMap
  title: string
}

const examples: Example[] = [
  {
    description: 'Chat with the AI assistant',
    href: '/examples/ai',
    icon: 'chatbubble-ellipses-outline',
    title: 'AI',
  },
  {
    description: 'Check Solana balances quickly',
    href: '/examples/solana',
    icon: 'wallet-outline',
    title: 'Solana',
  },
  {
    description: 'Manage your authenticated todo list',
    href: '/examples/todos',
    icon: 'checkbox-outline',
    title: 'Todos',
  },
]

function ExampleCard({
  description,
  href,
  icon,
  title,
  iconColor,
}: {
  description: string
  href: ExampleRoute
  icon: ExampleIconName
  iconColor: string
  title: string
}) {
  const router = useRouter()

  return (
    <Pressable className="w-full" onPress={() => router.push(href)}>
      <Card className="mb-4 w-full px-4 py-5">
        <View className="flex-row items-center gap-3">
          <Ionicons name={icon} size={24} color={iconColor} />
          <View>
            <Card.Title>{title}</Card.Title>
            <Text className="text-muted text-sm">{description}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  )
}

export default function ExamplesIndex() {
  const foregroundColor = useThemeColor('foreground')
  return (
    <ShellUiScrollView className="p-4">
      <ShellUiPageHeader
        description="Explore available demos."
        icon="apps"
        title="Examples"
      />
      {examples.map((example, index) => (
        <ExampleCard
          key={example.href + index.toString()}
          description={example.description}
          href={example.href}
          icon={example.icon}
          iconColor={foregroundColor}
          title={example.title}
        />
      ))}
    </ShellUiScrollView>
  )
}
