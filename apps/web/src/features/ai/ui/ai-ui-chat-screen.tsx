import type { RefObject } from 'react'

import { AiUiChatComposer } from './ai-ui-chat-composer'
import { AiUiChatMessageList } from './ai-ui-chat-message-list'

type MessagePart = {
  text?: string
  type: string
}

type Message = {
  id: string
  parts?: MessagePart[]
  role: string
}

export function AiUiChatScreen({
  messages,
  messagesEndRef,
  onSendMessage,
  status,
}: {
  messages: Message[]
  messagesEndRef: RefObject<HTMLDivElement | null>
  onSendMessage: (text: string) => void
  status: string
}) {
  return (
    <div className="mx-auto grid w-full max-w-3xl grid-rows-[1fr_auto] overflow-hidden p-4">
      <AiUiChatMessageList
        messages={messages}
        messagesEndRef={messagesEndRef}
        status={status}
      />
      <AiUiChatComposer onSendMessage={onSendMessage} />
    </div>
  )
}
