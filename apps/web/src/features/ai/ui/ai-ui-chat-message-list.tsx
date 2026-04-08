import type { RefObject } from 'react'

import { AiUiChatMessageItem } from './ai-ui-chat-message-item'

type MessagePart = {
  text?: string
  type: string
}

type Message = {
  id: string
  parts?: MessagePart[]
  role: string
}

export function AiUiChatMessageList({
  messages,
  messagesEndRef,
  status,
}: {
  messages: Message[]
  messagesEndRef: RefObject<HTMLDivElement | null>
  status: string
}) {
  return (
    <div className="space-y-4 overflow-y-auto pb-4">
      {messages.length === 0 ? (
        <div className="mt-8 text-center text-muted-foreground">
          Ask me anything to get started!
        </div>
      ) : (
        messages.map((message) => (
          <AiUiChatMessageItem
            isStreaming={status === 'streaming'}
            key={message.id}
            message={message}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
