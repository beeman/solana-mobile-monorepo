import { Separator } from 'heroui-native'
import type { RefObject } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  type ScrollView,
  View,
} from 'react-native'
import { AiUiChatComposer } from '@/features/ai/ui/ai-ui-chat-composer'
import { AiUiChatMessageList } from '@/features/ai/ui/ai-ui-chat-message-list'
import { ShellUiPageHeader } from '@/features/shell/ui/shell-ui-page-header'

type MessagePart = {
  text?: string
  type: string
}

type Message = {
  id: string
  parts: MessagePart[]
  role: string
}

type AiUiChatScreenProps = {
  messages: Message[]
  onSendMessage: (text: string) => void
  scrollViewRef: RefObject<ScrollView | null>
}

export function AiUiChatScreen({
  messages,
  onSendMessage,
  scrollViewRef,
}: AiUiChatScreenProps) {
  return (
    <View className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 px-4 py-4">
          <ShellUiPageHeader
            description="Chat with our AI assistant"
            icon="chatbubble-ellipses-outline"
            title="AI Chat"
          />

          <AiUiChatMessageList
            messages={messages}
            scrollViewRef={scrollViewRef}
          />

          <Separator className="mb-3" />

          <AiUiChatComposer onSendMessage={onSendMessage} />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
