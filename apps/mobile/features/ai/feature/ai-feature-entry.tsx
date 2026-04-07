import { useEffect, useRef } from 'react'
import type { ScrollView } from 'react-native'

import { useAiChat } from '@/features/ai/data-access/use-ai-chat'
import { AiUiChatError } from '@/features/ai/ui/ai-ui-chat-error'
import { AiUiChatScreen } from '@/features/ai/ui/ai-ui-chat-screen'

export function AiFeatureEntry() {
  const { error, messages, sendMessage } = useAiChat()
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    const messagesCount = messages.length
    if (messagesCount === 0) return

    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages.length])

  if (error) {
    return <AiUiChatError message={error.message} />
  }

  function handleSendMessage(text: string) {
    sendMessage({ text })
  }

  return (
    <AiUiChatScreen
      messages={messages}
      onSendMessage={handleSendMessage}
      scrollViewRef={scrollViewRef}
    />
  )
}
