import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from 'heroui-native'
import type { RefObject } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { AiUiChatMessageItem } from '@/features/ai/ui/ai-ui-chat-message-item'

type MessagePart = {
  text?: string
  type: string
}

type Message = {
  id: string
  parts: MessagePart[]
  role: string
}

type AiUiChatMessageListProps = {
  scrollViewRef: RefObject<ScrollView | null>
  messages: Message[]
}

export function AiUiChatMessageList({
  scrollViewRef,
  messages,
}: AiUiChatMessageListProps) {
  const mutedColor = useThemeColor('muted')

  if (messages.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={32}
          color={mutedColor}
        />
        <Text className="mt-3 text-muted text-sm">
          Ask me anything to get started
        </Text>
      </View>
    )
  }

  return (
    <ScrollView
      className="mb-4 flex-1"
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-2">
        {messages.map((message) => (
          <AiUiChatMessageItem message={message} key={message.id} />
        ))}
      </View>
    </ScrollView>
  )
}
