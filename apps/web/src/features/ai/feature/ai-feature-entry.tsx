import { useEffect, useRef } from 'react'

import { useAiChat } from '../data-access/use-ai-chat'
import { AiUiChatError } from '../ui/ai-ui-chat-error'
import { AiUiChatScreen } from '../ui/ai-ui-chat-screen'

export function AiFeatureEntry() {
  const { error, messages, sendMessage, status } = useAiChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!messages.length) {
      return
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  if (error) {
    return <AiUiChatError message={error.message} />
  }

  return (
    <AiUiChatScreen
      messages={messages}
      messagesEndRef={messagesEndRef}
      onSendMessage={(text) => {
        sendMessage({ text })
      }}
      status={status}
    />
  )
}
