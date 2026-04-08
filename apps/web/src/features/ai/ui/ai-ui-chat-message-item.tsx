import { Streamdown } from 'streamdown'

type MessagePart = {
  text?: string
  type: string
}

type Message = {
  id: string
  parts?: MessagePart[]
  role: string
}

export function AiUiChatMessageItem({
  isStreaming,
  message,
}: {
  isStreaming: boolean
  message: Message
}) {
  return (
    <div
      className={`rounded-lg p-3 ${
        message.role === 'user' ? 'ml-8 bg-primary/10' : 'mr-8 bg-secondary/20'
      }`}
    >
      <p className="mb-1 font-semibold text-sm">
        {message.role === 'user' ? 'You' : 'AI Assistant'}
      </p>
      {message.parts?.map((part, index) => {
        if (part.type === 'text') {
          return (
            <Streamdown
              isAnimating={isStreaming && message.role === 'assistant'}
              key={`${message.id}-part-${index}`}
            >
              {part.text ?? ''}
            </Streamdown>
          )
        }

        return null
      })}
    </div>
  )
}
